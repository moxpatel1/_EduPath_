import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import predictRoutes from "./routes/predict.js";



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/predict", predictRoutes);

// ✅ LOCAL DB CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/edupath")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});