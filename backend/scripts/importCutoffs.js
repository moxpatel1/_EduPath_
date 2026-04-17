import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import xlsx from "xlsx";
import dotenv from "dotenv";
import College from "../models/College.js";

dotenv.config();

const defaultMongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/edupath";
const workbookPath = process.argv[2];
const shouldReplace = process.argv.includes("--replace");

const headerAliases = {
  name: ["college", "college name", "institution", "institute", "name"],
  branch: ["branch", "program", "course", "department"],
  category: ["category", "caste", "quota category", "alloted cat", "allotted cat"],
  expectedCutoffRank: ["expected cutoff rank", "expected rank"],
  lastRank: ["last rank", "cutoff", "cutoff rank", "closing rank", "rank"],
  city: ["city", "location"],
  year: ["year", "admission year", "exam year"],
  round: ["round", "round no", "counselling round"],
  quota: ["quota", "seat type"],
  instituteType: ["institute type", "institute_type", "college type", "type"],
};

const normalizeKey = (value) => String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const titleCase = (value) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const normalizeBranch = (value) => {
  const normalized = normalizeKey(value);

  if (!normalized) {
    return "";
  }

  if (normalized.includes("computer") || normalized === "cse" || normalized.includes("c s e") || normalized.includes("cs")) {
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

  return titleCase(value);
};

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

const normalizeInstituteType = (value) => {
  const normalized = normalizeKey(value);

  if (!normalized) {
    return "";
  }

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

  return titleCase(value);
};

const parseNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numericValue = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(numericValue) ? numericValue : null;
};

const findHeaderRowIndex = (rows) => rows.findIndex((row) => {
  const normalizedCells = row.map((cell) => normalizeKey(cell));
  return normalizedCells.includes("college") && normalizedCells.includes("branch");
});

const resolveSheetRows = (worksheet) => {
  const grid = xlsx.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
  const headerRowIndex = findHeaderRowIndex(grid);

  if (headerRowIndex === -1) {
    return xlsx.utils.sheet_to_json(worksheet, { defval: "" });
  }

  const headers = grid[headerRowIndex].map((cell) => String(cell || "").trim());
  const dataRows = grid.slice(headerRowIndex + 1);

  return dataRows
    .filter((row) => row.some((cell) => String(cell || "").trim() !== ""))
    .map((row) => {
      const rowObject = {};
      headers.forEach((header, index) => {
        const fallbackHeader = `column_${index}`;
        rowObject[header || fallbackHeader] = row[index] ?? "";
      });
      return rowObject;
    });
};

const resolveField = (row, fieldName) => {
  const aliases = headerAliases[fieldName] || [fieldName];
  const entries = Object.entries(row);

  for (const [key, value] of entries) {
    const normalizedKey = normalizeKey(key);
    if (aliases.some((alias) => normalizedKey === normalizeKey(alias))) {
      return value;
    }
  }

  return "";
};

const buildRecord = (row) => {
  const name = String(resolveField(row, "name") || "").trim();
  const branch = normalizeBranch(resolveField(row, "branch"));
  const rawCategory = resolveField(row, "category");
  const category = normalizeCategory(rawCategory);
  const expectedCutoffRank = parseNumber(resolveField(row, "expectedCutoffRank"));
  const lastRank = parseNumber(resolveField(row, "lastRank"));
  const cutoffRank = lastRank ?? expectedCutoffRank;
  const city = String(resolveField(row, "city") || "").trim();
  const year = parseNumber(resolveField(row, "year"));
  const round = String(resolveField(row, "round") || "").trim();
  const quota = String(resolveField(row, "quota") || "").trim();
  const instituteType = normalizeInstituteType(resolveField(row, "instituteType"));

  if (!name || !branch || !category || cutoffRank === null) {
    return null;
  }

  return {
    name,
    branch,
    category,
    cutoffRank,
    expectedCutoffRank,
    lastRank,
    city,
    year,
    round,
    quota,
    instituteType,
  };
};

const buildMatchQuery = (record) => {
  const matchQuery = {
    name: record.name,
    branch: record.branch,
    category: record.category,
  };

  if (Number.isFinite(record.year)) {
    matchQuery.year = record.year;
  }

  if (record.city) {
    matchQuery.city = record.city;
  }

  if (record.round) {
    matchQuery.round = record.round;
  }

  if (record.quota) {
    matchQuery.quota = record.quota;
  }

  if (record.instituteType) {
    matchQuery.instituteType = record.instituteType;
  }

  return matchQuery;
};

const main = async () => {
  if (!workbookPath) {
    console.error("Usage: node scripts/importCutoffs.js <path-to-xlsx-or-csv> [--replace]");
    process.exit(1);
  }

  const resolvedPath = path.resolve(workbookPath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`File not found: ${resolvedPath}`);
    process.exit(1);
  }

  await mongoose.connect(defaultMongoUri);

  if (shouldReplace) {
    await College.deleteMany({});
  }

  const workbook = xlsx.readFile(resolvedPath);
  const rows = [];

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const sheetRows = resolveSheetRows(worksheet);
    rows.push(...sheetRows);
  }

  const documents = rows
    .map(buildRecord)
    .filter(Boolean);

  if (!documents.length) {
    console.error("No valid college rows found. Check the column headers in the spreadsheet.");
    process.exit(1);
  }

  const bulkOperations = documents.map((document) => ({
    updateOne: {
      filter: buildMatchQuery(document),
      update: { $set: document },
      upsert: true,
    },
  }));

  const result = await College.bulkWrite(bulkOperations, { ordered: false });

  console.log(`Processed ${documents.length} cutoff rows into MongoDB.`);
  console.log(`Inserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
};

main().catch(async (error) => {
  console.error("Import failed:", error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});