import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// ✅ Load JSON file
const filePath = path.resolve("data/colleges.json");
const colleges = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// ✅ Predict API
router.post("/", (req, res) => {
  const { rank, category, branch } = req.body;

  try {
    console.log("Incoming:", rank, category, branch);

    // ✅ FILTER (SAFE + FLEXIBLE)
    const filtered = colleges.filter((c) => {
      return (
        c.category?.toUpperCase().trim() === category.toUpperCase().trim() &&
        c.branch?.toLowerCase().trim() === branch.toLowerCase().trim()
      );
    });

    console.log("Filtered:", filtered.length);

    const safe = [];
    const target = [];
    const dream = [];

    filtered.forEach((c) => {
      const cutoff = c.cutoffRank;

      if (rank <= cutoff - 2000) {
        safe.push({ ...c, chance: "High" });
      } else if (rank <= cutoff) {
        target.push({ ...c, chance: "Medium" });
      } else {
        dream.push({ ...c, chance: "Low" });
      }
    });

    res.json({
      safe,
      target,
      dream,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Prediction error" });
  }
});

export default router;