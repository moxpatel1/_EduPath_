import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/edupath")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});