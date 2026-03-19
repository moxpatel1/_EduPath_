const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

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

// MongoDB Connection - Wait before starting server
async function startServer() {
  try {
    const mongoURI = "mongodb://localhost:27017/acpc";
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    
    console.log("✓ MongoDB Connected Successfully");
    
    // Only listen after DB connects
    app.listen(5000, () => {
      console.log("✓ Server running on port 5000");
    });
  } catch (err) {
    console.error("✗ MongoDB Connection Error:", err.message);
    console.log("⚠ Make sure MongoDB is running locally on port 27017");
    process.exit(1);
  }
}

startServer();