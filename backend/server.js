import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import College from "./models/College.js";
import authRoutes from "./routes/auth.js";
import predictRoutes from "./routes/predict.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });


const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("EduPath backend is running");
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/auth", authRoutes);
app.use("/api/predict", predictRoutes);

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/edupath";
const port = process.env.PORT || 5000;

const inferInstituteType = (collegeName) => {
  const normalized = String(collegeName || "").toLowerCase();
  const governmentTokens = [
    "ld college",
    "vgec",
    "gec",
    "msu",
    "svnit",
  ];

  return governmentTokens.some((token) => normalized.includes(token))
    ? "Government"
    : "Self-Finance";
};

const bootstrapCollegesIfEmpty = async () => {
  const collegeCount = await College.countDocuments({});

  if (collegeCount > 0) {
    return;
  }

  const seedPath = path.join(__dirname, "data", "Colleges.json");
  const seedRaw = await fs.readFile(seedPath, "utf-8");
  const seedData = JSON.parse(seedRaw);

  if (!Array.isArray(seedData) || seedData.length === 0) {
    console.warn("Skipping bootstrap: data/Colleges.json is empty or invalid");
    return;
  }

  const sanitized = seedData
    .map((item) => ({
      name: String(item.name || "").trim(),
      branch: String(item.branch || "").trim(),
      category: String(item.category || "").trim().toUpperCase(),
      cutoffRank: Number(item.cutoffRank),
      expectedCutoffRank: Number.isFinite(Number(item.expectedCutoffRank))
        ? Number(item.expectedCutoffRank)
        : Number(item.cutoffRank),
      lastRank: Number.isFinite(Number(item.lastRank)) ? Number(item.lastRank) : undefined,
      city: String(item.city || "").trim(),
      year: Number.isFinite(Number(item.year)) ? Number(item.year) : undefined,
      round: String(item.round || "").trim(),
      quota: String(item.quota || "ACPC").trim(),
      instituteType: String(item.instituteType || inferInstituteType(item.name)).trim(),
    }))
    .filter((item) => item.name && item.branch && item.category && Number.isFinite(item.cutoffRank));

  if (!sanitized.length) {
    console.warn("Skipping bootstrap: no valid records in data/Colleges.json");
    return;
  }

  await College.insertMany(sanitized, { ordered: false });
  console.log(`Bootstrapped ${sanitized.length} colleges from data/Colleges.json`);
};

const backfillCollegeFields = async () => {
  const colleges = await College.find({}).select("name cutoffRank expectedCutoffRank quota instituteType").lean();

  const operations = colleges
    .map((college) => {
      const set = {};

      if (!Number.isFinite(Number(college.expectedCutoffRank))) {
        set.expectedCutoffRank = Number(college.cutoffRank);
      }

      if (!String(college.quota || "").trim()) {
        set.quota = "ACPC";
      }

      if (!String(college.instituteType || "").trim()) {
        set.instituteType = inferInstituteType(college.name);
      }

      if (!Object.keys(set).length) {
        return null;
      }

      return {
        updateOne: {
          filter: { _id: college._id },
          update: { $set: set },
        },
      };
    })
    .filter(Boolean);

  if (!operations.length) {
    return;
  }

  await College.bulkWrite(operations, { ordered: false });
  console.log(`Backfilled missing fields for ${operations.length} college records`);
};

mongoose.connect(mongoUri)
  .then(async () => {
    console.log("MongoDB Connected");
    await bootstrapCollegesIfEmpty();
    await backfillCollegeFields();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });