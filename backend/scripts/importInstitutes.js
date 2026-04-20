import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import xlsx from "xlsx";
import dotenv from "dotenv";
import Institute from "../models/Institute.js";

dotenv.config();

const defaultMongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/edupath";
const workbookPath = process.argv[2];
const shouldReplace = process.argv.includes("--replace");
const sourceYearArg = process.argv.find((arg) => arg.startsWith("--year="));
const sourceYear = sourceYearArg ? sourceYearArg.split("=")[1] : "2025-26";

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

const normalizeSearchText = (value) => cleanText(value)
  .toLowerCase()
  .replace(/[\u2013\u2014]/g, "-")
  .replace(/[^a-z0-9\s+&().,-]/gi, " ")
  .replace(/\s+/g, " ")
  .trim();

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

const normalizeWebsiteUrl = (value) => {
  const trimmed = rawText(value).trim();
  if (!trimmed) {
    return "";
  }

  const sanitized = trimmed
    .replace(/[)>,;]+$/g, "")
    .replace(/^www\./i, "www.");

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

const isSectionLabel = (value) => {
  const normalized = cleanText(value).toLowerCase();
  return normalized && !/^[0-9]+$/.test(normalized) && (
    normalized.includes("government and grant in aid institutes")
    || normalized.includes("self financed institutes")
    || normalized.includes("new institutes")
  );
};

const parseNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numericValue = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(numericValue) ? numericValue : null;
};

const hasPositiveSeat = (value) => Number.isFinite(value) && value > 0;

const deriveInstituteType = ({ managementGujcet, managementJee, nri, government }, fallbackType = "") => {
  if (hasPositiveSeat(managementGujcet) || hasPositiveSeat(managementJee) || hasPositiveSeat(nri)) {
    return "Self-Finance";
  }

  if (Number.isFinite(government) && government >= 0) {
    return "Government";
  }

  return fallbackType || "";
};

const inferInstituteType = (sectionLabel) => {
  const label = cleanText(sectionLabel).toLowerCase();

  if (label.includes("government") || label.includes("grant in aid")) {
    return "Government";
  }

  if (label.includes("self financed") || label.includes("self-financed") || label.includes("new institutes")) {
    return "Self-Finance";
  }

  return "";
};

const parseFacility = (value) => {
  const text = cleanText(value);

  const readValue = (label) => {
    const match = text.match(new RegExp(`${label}:\\s*([^\\s]+)`, "i"));
    return match ? cleanText(match[1]) : "";
  };

  return {
    boysHostel: readValue("Boys Hostel"),
    girlsHostel: readValue("Girls Hostel"),
    mess: readValue("Mess"),
    transportation: readValue("Transportation"),
  };
};

const buildSearchText = (document) => normalizeSearchText([
  document.instituteName,
  document.instituteDetails,
  document.branchName,
  document.district,
  document.university,
  document.instituteType,
].filter(Boolean).join(" "));

const main = async () => {
  if (!workbookPath) {
    console.error("Usage: node scripts/importInstitutes.js <path-to-xlsx> [--year=2025-26] [--replace]");
    process.exit(1);
  }

  const resolvedPath = path.resolve(workbookPath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`File not found: ${resolvedPath}`);
    process.exit(1);
  }

  await mongoose.connect(defaultMongoUri);

  if (shouldReplace) {
    await Institute.deleteMany({ sourceYear });
  }

  const workbook = xlsx.readFile(resolvedPath);
  const documents = [];

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(worksheet, { defval: "" });

    let currentSectionType = "";
    let currentInstitute = null;

    for (const row of rows) {
      const sectionCandidate = cleanText(row["Sr.\nNo."]);
      if (isSectionLabel(sectionCandidate)) {
        const detectedSectionType = inferInstituteType(sectionCandidate);
        currentSectionType = detectedSectionType;
      }

      const branchName = cleanText(row["Branch Name"]);
      const instituteCellRaw = rawText(row["Name of Institute"]);
      const instituteCell = cleanText(row["Name of Institute"]);

      if (!instituteCell && !branchName) {
        continue;
      }

      if (branchName.toLowerCase() === "branch name") {
        continue;
      }

      if (branchName.toLowerCase() === "total") {
        continue;
      }

      if (cleanText(row["Management Seats"]).toUpperCase() === "GUJCET") {
        continue;
      }

      const extractedInstituteName = extractInstituteNameFromCell(instituteCellRaw);
      const hasRealInstituteName = instituteCell && !isMetadataOnlyInstituteCell(instituteCell) && !!extractedInstituteName;

      if (hasRealInstituteName) {
        const sanitizedBlock = sanitizeInstituteBlock(instituteCellRaw);
        currentInstitute = {
          instituteName: extractedInstituteName,
          instituteDetails: sanitizedBlock || instituteCellRaw,
          rawDetails: instituteCellRaw,
        };
      } else if (currentInstitute && instituteCell) {
        const sanitizedBlock = sanitizeInstituteBlock(instituteCellRaw);
        currentInstitute = {
          ...currentInstitute,
          instituteDetails: [currentInstitute.instituteDetails, sanitizedBlock || instituteCellRaw].filter(Boolean).join("\n"),
          rawDetails: [currentInstitute.rawDetails, instituteCellRaw].filter(Boolean).join("\n"),
        };
      }

      if (!currentInstitute || !currentInstitute.instituteName) {
        continue;
      }

      const district = cleanText(row.District);

      if (!branchName) {
        continue;
      }

      const intake = parseNumber(row["Intake\n2025-26"]);
      const managementGujcet = parseNumber(row["Management Seats"]);
      const managementJee = parseNumber(row.__EMPTY);
      const nri = parseNumber(row.__EMPTY_1);
      const governmentSeats = parseNumber(row["Government\nSeats"]);
      const fees = parseNumber(row.Fees);
      const university = cleanText(row.University);

      // Skip wrapped continuation rows that are not standalone branch records.
      const hasNoAdmissionNumbers = (
        intake === null
        && managementGujcet === null
        && managementJee === null
        && nri === null
        && governmentSeats === null
      );

      if (hasNoAdmissionNumbers && !fees && !university && !district) {
        continue;
      }

      const instituteType = deriveInstituteType(
        {
          managementGujcet,
          managementJee,
          nri,
          government: governmentSeats,
        },
        currentSectionType,
      );

      const document = {
        sourceYear,
        rawInstituteCell: currentInstitute.instituteDetails,
        instituteName: cleanText(currentInstitute.instituteName),
        instituteDetails: currentInstitute.instituteDetails,
        rawBranchCell: rawText(row["Branch Name"]),
        branchName: cleanText(branchName),
        branchNormalized: normalizeSearchText(branchName),
        intake,
        seats: {
          managementGujcet,
          managementJee,
          nri,
          government: governmentSeats,
        },
        nba: cleanText(row.NBA),
        naac: cleanText(row.NAAC),
        university,
        websiteUrl: extractWebsiteUrl(currentInstitute.rawDetails || currentInstitute.instituteDetails),
        annualFees: fees,
        facilities: parseFacility(row.Facility),
        district,
        instituteType,
      };

      document.searchText = buildSearchText(document);
      documents.push(document);
    }
  }

  if (!documents.length) {
    console.error("No valid institute rows found.");
    process.exit(1);
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

  const result = await Institute.bulkWrite(operations, { ordered: false });

  console.log(`Processed ${documents.length} ACPC institute rows.`);
  console.log(`Inserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
};

main().catch(async (error) => {
  console.error("Institute import failed:", error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
