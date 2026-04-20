import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema({
  sourceYear: { type: String, default: "2025-26", trim: true },
  rawInstituteCell: { type: String },
  instituteName: { type: String, required: true, trim: true },
  instituteDetails: { type: String, trim: true },
  rawBranchCell: { type: String },
  branchName: { type: String, required: true, trim: true },
  branchNormalized: { type: String, trim: true },
  intake: { type: Number },
  seats: {
    managementGujcet: { type: Number },
    managementJee: { type: Number },
    nri: { type: Number },
    government: { type: Number },
  },
  nba: { type: String, trim: true },
  naac: { type: String, trim: true },
  university: { type: String, trim: true },
  websiteUrl: { type: String, trim: true },
  annualFees: { type: Number },
  facilities: {
    boysHostel: { type: String, trim: true },
    girlsHostel: { type: String, trim: true },
    mess: { type: String, trim: true },
    transportation: { type: String, trim: true },
  },
  district: { type: String, trim: true },
  instituteType: { type: String, trim: true },
  searchText: { type: String, trim: true },
});

instituteSchema.index({ sourceYear: 1, instituteName: 1, branchName: 1, district: 1 }, { unique: true });
instituteSchema.index({ district: 1, branchName: 1, instituteType: 1 });

export default mongoose.model("Institute", instituteSchema);
