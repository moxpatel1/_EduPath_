import express from "express";
import Institute from "../models/Institute.js";

const router = express.Router();

const escapeRegex = (value) => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const normalizeText = (value) => String(value || "")
  .toLowerCase()
  .replace(/[\u2013\u2014]/g, "-")
  .replace(/[^a-z0-9\s+&().,-]/gi, " ")
  .replace(/\s+/g, " ")
  .trim();

router.get("/", async (req, res) => {
  try {
    const {
      q,
      district,
      branch,
      instituteType,
      sourceYear = "2025-26",
      limit = "50",
      skip = "0",
    } = req.query;

    const parsedLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
    const parsedSkip = Math.max(Number(skip) || 0, 0);

    const query = {
      sourceYear: String(sourceYear).trim(),
    };

    if (q) {
      query.$or = [
        { instituteName: { $regex: escapeRegex(q), $options: "i" } },
        { instituteDetails: { $regex: escapeRegex(q), $options: "i" } },
        { searchText: { $regex: escapeRegex(q), $options: "i" } },
      ];
    }

    if (district) {
      query.district = { $regex: `^${escapeRegex(district)}$`, $options: "i" };
    }

    if (branch) {
      query.branchNormalized = { $regex: escapeRegex(normalizeText(branch)), $options: "i" };
    }

    if (instituteType) {
      query.instituteType = { $regex: `^${escapeRegex(instituteType)}$`, $options: "i" };
    }

    const [total, institutes] = await Promise.all([
      Institute.countDocuments(query),
      Institute.find(query)
        .sort({ instituteName: 1, branchName: 1 })
        .skip(parsedSkip)
        .limit(parsedLimit)
        .lean(),
    ]);

    const distinctSourceYearsPromise = Institute.distinct("sourceYear");
    const distinctDistrictsPromise = Institute.distinct("district", { sourceYear: query.sourceYear });
    const distinctBranchesPromise = Institute.distinct("branchName", { sourceYear: query.sourceYear });

    const [sourceYears, districts, branches] = await Promise.all([
      distinctSourceYearsPromise,
      distinctDistrictsPromise,
      distinctBranchesPromise,
    ]);

    res.json({
      total,
      limit: parsedLimit,
      skip: parsedSkip,
      sourceYear: query.sourceYear,
      sourceYears: sourceYears.filter(Boolean).sort(),
      filters: {
        districts: districts.filter(Boolean).sort(),
        branches: branches.filter(Boolean).sort(),
        instituteTypes: ["Government", "Self-Finance"],
      },
      institutes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Institutes fetch error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id).lean();

    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    return res.json(institute);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Institute detail fetch error" });
  }
});

export default router;
