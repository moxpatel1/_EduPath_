import express from "express";
import College from "../models/College.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { rank, category, branch } = req.body;

    const colleges = await College.find({
      branch,
      category,
    });

    const safe = [];
    const target = [];
    const dream = [];

    colleges.forEach((college) => {
      const diff = college.closingRank - rank;

      if (diff >= 1500) {
        safe.push(college);
      } else if (diff >= 0 && diff < 1500) {
        target.push(college);
      } else {
        dream.push(college);
      }
    });

    res.json({ safe, target, dream });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;