import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: String,
  branch: String,
  category: String,
  closingRank: Number
});

export default mongoose.model("College", collegeSchema);