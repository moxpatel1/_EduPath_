import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import predictRoutes from "./routes/predict.js";



dotenv.config(); 

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB (USE ATLAS NOW)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/predict", predictRoutes);

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});