import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { fileURLToPath } from "url";
import xlsx from "xlsx";
import College from "./models/College.js";
import Institute from "./models/Institute.js";
import authRoutes from "./routes/auth.js";
import predictRoutes from "./routes/predict.js";
import instituteRoutes from "./routes/institutes.js";

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
app.use("/api/institutes", instituteRoutes);

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/edupath";
const port = process.env.PORT || 5000;
const enableBootstrapSampleData = process.env.BOOTSTRAP_SAMPLE_DATA === "true";
const enableFieldBackfill = process.env.BACKFILL_COLLEGE_FIELDS === "true";

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

const cleanText = (value) => String(value || "").replace(/\s+/g, " ").trim();
const rawText = (value) => String(value ?? "");

const instituteKeywords = [
  "university",
  "institute",
  "college",
  "faculty",
  "school",
  "academy",
  "polytechnic",
  "technology",
  "engineering",
];

const isMetadataOnlyInstituteCell = (value) => {
  const normalized = cleanText(value).toLowerCase();

  if (!normalized) {
    return false;
  }

  return (
    normalized.startsWith("email:")
    || normalized.startsWith("website:")
    || normalized.startsWith("contact no:")
    || normalized.startsWith("contact:")
    || normalized.startsWith("phone:")
    || normalized.startsWith("tel:")
  );
};

const sanitizeInstituteBlock = (value) => rawText(value)
  .replace(/\r/g, "")
  .replace(/Contact\s*No\s*:[^\n]*/gi, "")
  .replace(/Email\s*:[^\n]*/gi, "")
  .replace(/Website\s*:[^\n]*/gi, "")
  .replace(/\n{2,}/g, "\n")
  .trim();

const extractInstituteNameFromCell = (value) => {
  const sanitized = sanitizeInstituteBlock(value);

  if (!sanitized) {
    return "";
  }

  const flattened = cleanText(sanitized).replace(/^\*+\s*/, "");
  const parts = flattened
    .split(/\s*[,;|-]\s*/)
    .map((part) => cleanText(part))
    .filter(Boolean);

  const byKeywordPart = parts.find((part) => {
    const lowered = part.toLowerCase();
    return instituteKeywords.some((keyword) => lowered.includes(keyword));
  });

  if (byKeywordPart) {
    return byKeywordPart;
  }

  const lines = sanitized
    .split("\n")
    .map((line) => cleanText(line).replace(/^\*+\s*/, ""))
    .filter(Boolean);

  const byKeywordLine = lines.find((line) => {
    const lowered = line.toLowerCase();
    return instituteKeywords.some((keyword) => lowered.includes(keyword));
  });

  if (byKeywordLine) {
    return byKeywordLine;
  }

  return "";
};

const normalizeSearchText = (value) => cleanText(value)
  .toLowerCase()
  .replace(/[\u2013\u2014]/g, "-")
  .replace(/[^a-z0-9\s+&().,-]/gi, " ")
  .replace(/\s+/g, " ")
  .trim();

const normalizeWebsiteUrl = (value) => {
  const trimmed = rawText(value).trim();
  if (!trimmed) {
    return "";
  }

  const sanitized = trimmed.replace(/[)>,;]+$/g, "");

  if (/^https?:\/\//i.test(sanitized)) {
    return sanitized;
  }

  if (/^www\./i.test(sanitized)) {
    return `https://${sanitized}`;
  }

  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(sanitized)) {
    return `https://${sanitized}`;
  }

  return "";
};

const extractWebsiteUrl = (value) => {
  const text = rawText(value);

  const labeledLine = text.match(/website\s*:\s*([^\n]+)/i);
  if (labeledLine?.[1]) {
    const candidate = labeledLine[1].match(/(https?:\/\/[^\s,;]+|www\.[^\s,;]+|[a-z0-9-]+(?:\.[a-z0-9-]+)+\.[a-z]{2,}(?:\/[^\s,;]*)?)/i);
    const normalized = normalizeWebsiteUrl(candidate?.[1] || "");
    if (normalized) {
      return normalized;
    }
  }

  const directUrl = text.match(/https?:\/\/[^\s,;\n)]+/i);
  if (directUrl?.[0]) {
    const normalized = normalizeWebsiteUrl(directUrl[0]);
    if (normalized) {
      return normalized;
    }
  }

  const domainOnly = text.match(/\bwww\.[a-z0-9.-]+\.[a-z]{2,}(?:\/[a-z0-9._~:/?#[\]@!$&'()*+,;=-]*)?/i);
  if (domainOnly?.[0]) {
    return normalizeWebsiteUrl(domainOnly[0]);
  }

  return "";
};

const deriveInstituteType = ({ managementGujcet, managementJee, nri, government }, fallbackType = "") => {
  const hasPositiveSeat = (value) => Number.isFinite(value) && value > 0;

  if (hasPositiveSeat(managementGujcet) || hasPositiveSeat(managementJee) || hasPositiveSeat(nri)) {
    return "Self-Finance";
  }

  if (Number.isFinite(government) && government >= 0) {
    return "Government";
  }

  return fallbackType || "";
};

const parseInstituteSeedRow = (row, currentInstitute, currentSectionType) => {
  const branchName = cleanText(row["Branch Name"]);
  const instituteCellRaw = rawText(row["Name of Institute"]);
  const instituteCell = cleanText(row["Name of Institute"]);

  if (!instituteCell && !branchName) {
    return null;
  }

  if (branchName.toLowerCase() === "branch name" || branchName.toLowerCase() === "total") {
    return null;
  }

  if (cleanText(row["Management Seats"]).toUpperCase() === "GUJCET") {
    return null;
  }

  const extractedInstituteName = extractInstituteNameFromCell(instituteCellRaw);
  const hasRealInstituteName = instituteCell && !isMetadataOnlyInstituteCell(instituteCell) && !!extractedInstituteName;

  let instituteState = currentInstitute;

  if (hasRealInstituteName) {
    const sanitizedBlock = sanitizeInstituteBlock(instituteCellRaw);
    instituteState = {
      instituteName: extractedInstituteName,
      instituteDetails: sanitizedBlock || instituteCellRaw,
      rawDetails: instituteCellRaw,
    };
  } else if (instituteState && instituteCell) {
    const sanitizedBlock = sanitizeInstituteBlock(instituteCellRaw);
    instituteState = {
      ...instituteState,
      instituteDetails: [instituteState.instituteDetails, sanitizedBlock || instituteCellRaw].filter(Boolean).join("\n"),
      rawDetails: [instituteState.rawDetails, instituteCellRaw].filter(Boolean).join("\n"),
    };
  }

  if (!instituteState || !instituteState.instituteName) {
    return null;
  }

  const intake = Number(String(row["Intake\n2025-26"]).replace(/[^0-9.-]/g, ""));
  const managementGujcet = Number(String(row["Management Seats"]).replace(/[^0-9.-]/g, ""));
  const managementJee = Number(String(row.__EMPTY).replace(/[^0-9.-]/g, ""));
  const nri = Number(String(row.__EMPTY_1).replace(/[^0-9.-]/g, ""));
  const governmentSeats = Number(String(row["Government\nSeats"]).replace(/[^0-9.-]/g, ""));
  const fees = Number(String(row.Fees).replace(/[^0-9.-]/g, ""));
  const university = cleanText(row.University);
  const district = cleanText(row.District);

  const document = {
    sourceYear: "2025-26",
    rawInstituteCell: instituteState.instituteDetails,
    instituteName: cleanText(instituteState.instituteName),
    instituteDetails: instituteState.instituteDetails,
    rawBranchCell: rawText(row["Branch Name"]),
    branchName: cleanText(branchName),
    branchNormalized: normalizeSearchText(branchName),
    intake: Number.isFinite(intake) ? intake : null,
    seats: {
      managementGujcet: Number.isFinite(managementGujcet) ? managementGujcet : null,
      managementJee: Number.isFinite(managementJee) ? managementJee : null,
      nri: Number.isFinite(nri) ? nri : null,
      government: Number.isFinite(governmentSeats) ? governmentSeats : null,
    },
    nba: cleanText(row.NBA),
    naac: cleanText(row.NAAC),
    university,
    websiteUrl: extractWebsiteUrl(instituteState.rawDetails || instituteState.instituteDetails),
    annualFees: Number.isFinite(fees) ? fees : null,
    facilities: {
      boysHostel: cleanText(String(row.Facility || "").match(/Boys Hostel:([^\s]+)/i)?.[1] || ""),
      girlsHostel: cleanText(String(row.Facility || "").match(/Girls Hostel:([^\s]+)/i)?.[1] || ""),
      mess: cleanText(String(row.Facility || "").match(/Mess:([^\s]+)/i)?.[1] || ""),
      transportation: cleanText(String(row.Facility || "").match(/Transportation:([^\s]+)/i)?.[1] || ""),
    },
    district,
    instituteType: deriveInstituteType(
      {
        managementGujcet: Number.isFinite(managementGujcet) ? managementGujcet : null,
        managementJee: Number.isFinite(managementJee) ? managementJee : null,
        nri: Number.isFinite(nri) ? nri : null,
        government: Number.isFinite(governmentSeats) ? governmentSeats : null,
      },
      currentSectionType,
    ),
  };

  document.searchText = normalizeSearchText([
    document.instituteName,
    document.instituteDetails,
    document.branchName,
    document.district,
    document.university,
    document.instituteType,
    document.websiteUrl,
  ].filter(Boolean).join(" "));

  return { document, instituteState };
};

const bootstrapInstitutesIfEmpty = async () => {
  const instituteCount = await Institute.countDocuments({});

  if (instituteCount > 0) {
    return;
  }

  const workbookPath = path.join(__dirname, "..", "provisional-list-of-institutes-be-2025-26-update-51750335359 (1).xlsx");

  if (!fsSync.existsSync(workbookPath)) {
    console.warn(`Skipping institute bootstrap: workbook not found at ${workbookPath}`);
    return;
  }

  const workbook = xlsx.readFile(workbookPath);
  const documents = [];

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(worksheet, { defval: "" });

    let currentSectionType = "";
    let currentInstitute = null;

    for (const row of rows) {
      const sectionCandidate = cleanText(row["Sr.\nNo."]);
      if (sectionCandidate && !/^[0-9]+$/.test(sectionCandidate) && sectionCandidate.toLowerCase().includes("government")) {
        currentSectionType = "Government";
      } else if (sectionCandidate && !/^[0-9]+$/.test(sectionCandidate) && sectionCandidate.toLowerCase().includes("self")) {
        currentSectionType = "Self-Finance";
      }

      const parsed = parseInstituteSeedRow(row, currentInstitute, currentSectionType);
      if (!parsed) {
        continue;
      }

      currentInstitute = parsed.instituteState;
      documents.push(parsed.document);
    }
  }

  if (!documents.length) {
    console.warn("Skipping institute bootstrap: no valid institute records found in workbook");
    return;
  }

  const operations = documents.map((document) => ({
    updateOne: {
      filter: {
        sourceYear: document.sourceYear,
        instituteName: document.instituteName,
        branchName: document.branchName,
        district: document.district,
      },
      update: { $set: document },
      upsert: true,
    },
  }));

  await Institute.bulkWrite(operations, { ordered: false });
  console.log(`Bootstrapped ${documents.length} institutes from workbook`);
};

mongoose.connect(mongoUri)
  .then(async () => {
    console.log("MongoDB Connected");
    if (enableBootstrapSampleData) {
      await bootstrapCollegesIfEmpty();
    }

    if (enableFieldBackfill) {
      await backfillCollegeFields();
    }

    await bootstrapInstitutesIfEmpty();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });