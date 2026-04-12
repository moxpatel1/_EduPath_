import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: String,
  branch: String,
  category: String,
  cutoffRank: Number,
  city: String,
});

export default mongoose.model("College", collegeSchema);