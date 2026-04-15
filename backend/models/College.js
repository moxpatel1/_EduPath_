import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  branch: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true, uppercase: true },
  cutoffRank: { type: Number, required: true },
  expectedCutoffRank: { type: Number },
  lastRank: { type: Number },
  city: { type: String, trim: true },
  year: { type: Number },
  round: { type: String, trim: true },
  quota: { type: String, trim: true },
  instituteType: { type: String, trim: true },
});

collegeSchema.index({ category: 1, branch: 1, year: -1, cutoffRank: 1 });
collegeSchema.index({ name: 1, branch: 1 });

export default mongoose.model("College", collegeSchema);