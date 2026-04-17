import express from "express";
import College from "../models/College.js";

const router = express.Router();

const CATEGORY_ALIASES = {
  GEN: "OPEN",
  GENERAL: "OPEN",
  UR: "OPEN",
  OBC: "SEBC",
  "OBC-PH": "SEBC-PH",
  OBCPH: "SEBC-PH",
  SEBCPH: "SEBC-PH",
};

const normalizeCategory = (value) => {
  const normalized = String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

  if (!normalized) {
    return "";
  }

  return CATEGORY_ALIASES[normalized] || normalized;
};
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

const resolveValidYear = (value) => {
  const parsed = Number(value);
  // Ignore unknown/placeholder year values like 0 so filtering does not hide valid results.
  if (!Number.isFinite(parsed) || parsed < 2000) {
    return null;
  }
  return parsed;
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
      baseQuery.category = normalizeCategory(category);
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

    let resolvedYear = resolveValidYear(year);

    if (!resolvedYear) {
      const latestYearDoc = await College.find(baseQuery)
        .sort({ year: -1 })
        .select("year")
        .limit(1)
        .lean();

      if (latestYearDoc.length) {
        resolvedYear = resolveValidYear(latestYearDoc[0].year);
      }
    }

    const finalQuery = {
      ...baseQuery,
      ...(resolvedYear !== null ? { year: resolvedYear } : {}),
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

    const latestYearDoc = await College.find(baseQuery)
      .sort({ year: -1 })
      .select("year")
      .limit(1)
      .lean();

    const latestYear = latestYearDoc.length
      ? resolveValidYear(latestYearDoc[0].year)
      : null;

    const yearScopedBaseQuery = {
      ...baseQuery,
      ...(latestYear !== null ? { year: latestYear } : {}),
    };

    const findNearest = async (matchQuery, limit = 120) => College.aggregate([
      { $match: matchQuery },
      {
        $addFields: {
          rankGap: { $subtract: ["$cutoffRank", rank] },
          rankGapAbs: { $abs: { $subtract: ["$cutoffRank", rank] } },
        },
      },
      { $sort: { rankGapAbs: 1, cutoffRank: 1, name: 1 } },
      { $limit: limit },
    ]);

    // Primary: same category + branch (and latest valid year when available).
    let colleges = await findNearest(yearScopedBaseQuery, 140);

    // Fallback: if exact category is too sparse, widen to same branch across categories.
    let usedFallbackCategory = false;
    if (colleges.length < 10) {
      usedFallbackCategory = true;
      const branchOnlyQuery = {
        branch,
        ...(latestYear !== null ? { year: latestYear } : {}),
      };
      colleges = await findNearest(branchOnlyQuery, 160);
    }

    const safe = [];
    const target = [];
    const dream = [];

    colleges
      .sort((left, right) => Number(left.cutoffRank) - Number(right.cutoffRank))
      .forEach((c) => {
        const cutoff = Number(c.cutoffRank);
        const delta = cutoff - rank;

        if (delta >= 2500) {
          safe.push({ ...c, chance: "High" });
        } else if (delta >= -1500) {
          target.push({ ...c, chance: "Medium" });
        } else {
          dream.push({ ...c, chance: "Low" });
        }
      });

    res.json({
      inputRank: rank,
      safe,
      target,
      dream,
      latestYear,
      usedFallbackCategory,
      categoryUsed: category,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Prediction error" });
  }
});

export default router;