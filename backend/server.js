const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const collegeRoutes = require("./routes/college");

// Load environment variables from .env (Node.js 20.6+/22+ feature). Safe to ignore if missing.
try {
  if (typeof process.loadEnvFile === "function") {
    // Load from repo root so it works even if you run `node server.js` from /backend.
    process.loadEnvFile(path.resolve(__dirname, "..", ".env"));
  }
} catch (err) {
  if (!err || err.code !== "ENOENT") {
    console.warn("Warning: failed to load .env:", err?.message || err);
  }
}

const app = express();

// CORS Configuration - Allow requests from localhost and any origin for development
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.send("ACPC Predictor Backend Running");
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// College Routes
app.use("/api", collegeRoutes);

// MongoDB Connection - Wait before starting server
async function startServer() {
  try {
    const PORT = Number.parseInt(process.env.PORT, 10) || 5000;
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/acpc";
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    
    console.log(`MongoDB connected (${mongoose.connection.host}/${mongoose.connection.name})`);
    
    // Only listen after DB connects
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.log("Tip: set MONGO_URI in .env (local MongoDB or MongoDB Atlas connection string).");
    process.exit(1);
  }
}

startServer();
