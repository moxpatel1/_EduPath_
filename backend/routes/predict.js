import express from "express";
import College from "../models/College.js";

const router = express.Router();

const normalizeCategory = (value) => String(value || "").trim().toUpperCase();
const escapeRegex = (value) => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const normalizeInstituteType = (value) => {
  const normalized = String(value || "").trim().toLowerCase();

  if (normalized.includes("self")) {
    return "Self-Finance";
  }

  if (
    normalized.includes("government")
    || normalized.includes("govt")
    || normalized.includes("gia")
    || normalized.includes("grant in aid")
    || normalized.includes("auto")
  ) {
    return "Government";
  }

  return String(value || "").trim();
};

const normalizeBranch = (value) => {
  const normalized = String(value || "").trim().toLowerCase();

  if (normalized.includes("computer") || normalized === "cse" || normalized === "cs" || normalized.includes("cse")) {
    return "CSE";
  }

  if (normalized.includes("information") || normalized === "it" || normalized.includes("information technology")) {
    return "IT";
  }

  if (normalized.includes("mechanical")) {
    return "Mechanical";
  }

  if (normalized.includes("electrical")) {
    return "Electrical";
  }

  if (normalized.includes("civil")) {
    return "Civil";
  }

  return String(value || "").trim();
};

const getLatestYear = (colleges) => {
  const years = colleges
    .map((college) => college.year)
    .filter((year) => Number.isFinite(Number(year)))
    .map((year) => Number(year));

  if (!years.length) {
    return null;
  }

  return Math.max(...years);
};

// Search colleges API backed by MongoDB
router.get("/search", async (req, res) => {
  try {
    const {
      q,
      city,
      branch,
      category,
      instituteType,
      collegeType,
      quota,
      round,
      year,
      limit,
      skip,
    } = req.query;

    const parsedLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
    const parsedSkip = Math.max(Number(skip) || 0, 0);

    const baseQuery = {};

    if (q) {
      baseQuery.name = { $regex: escapeRegex(q), $options: "i" };
    }

    if (city) {
      baseQuery.city = { $regex: `^${escapeRegex(city)}$`, $options: "i" };
    }

    if (branch) {
      baseQuery.branch = normalizeBranch(branch);
    }

    if (category) {
      baseQuery.category = normalizeCategory(category === "GEN" ? "OPEN" : category);
    }

    if (instituteType || collegeType) {
      baseQuery.instituteType = normalizeInstituteType(instituteType || collegeType);
    }

    if (quota) {
      baseQuery.quota = { $regex: `^${escapeRegex(quota)}$`, $options: "i" };
    }

    if (round) {
      baseQuery.round = { $regex: `^${escapeRegex(round)}$`, $options: "i" };
    }

    let resolvedYear = Number.isFinite(Number(year)) ? Number(year) : null;

    if (!resolvedYear) {
      const latestYearDoc = await College.find(baseQuery)
        .sort({ year: -1 })
        .select("year")
        .limit(1)
        .lean();

      if (latestYearDoc.length && Number.isFinite(Number(latestYearDoc[0].year))) {
        resolvedYear = Number(latestYearDoc[0].year);
      }
    }

    const finalQuery = {
      ...baseQuery,
      ...(resolvedYear ? { year: resolvedYear } : {}),
    };

    const [total, colleges] = await Promise.all([
      College.countDocuments(finalQuery),
      College.find(finalQuery)
        .sort({ cutoffRank: 1, name: 1 })
        .skip(parsedSkip)
        .limit(parsedLimit)
        .lean(),
    ]);

    res.json({
      total,
      limit: parsedLimit,
      skip: parsedSkip,
      latestYear: resolvedYear,
      colleges,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "College search error" });
  }
});

// Predict API backed by MongoDB
router.post("/", async (req, res) => {
  const rank = Number(req.body.rank);
  const category = normalizeCategory(req.body.category);
  const branch = normalizeBranch(req.body.branch);

  try {
    if (!Number.isFinite(rank) || !category || !branch) {
      return res.status(400).json({ message: "rank, category, and branch are required" });
    }

    const baseQuery = {
      category,
      branch,
    };

    const matchedColleges = await College.find(baseQuery).sort({ year: -1, cutoffRank: 1 }).lean();

    const latestYear = getLatestYear(matchedColleges);
    const colleges = latestYear
      ? matchedColleges.filter((college) => Number(college.year) === latestYear)
      : matchedColleges;

    const safe = [];
    const target = [];
    const dream = [];

    colleges
      .sort((left, right) => Number(left.cutoffRank) - Number(right.cutoffRank))
      .forEach((c) => {
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
      latestYear,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Prediction error" });
  }
});

export default router;