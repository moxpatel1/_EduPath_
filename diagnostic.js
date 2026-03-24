#!/usr/bin/env node

const mongoose = require('mongoose');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env (Node.js 20.6+/22+ feature). Safe to ignore if missing.
try {
  if (typeof process.loadEnvFile === "function") {
    process.loadEnvFile(path.resolve(__dirname, ".env"));
  }
} catch (err) {
  if (!err || err.code !== "ENOENT") {
    console.warn("Warning: failed to load .env:", err?.message || err);
  }
}

console.log('\n========== EduPath Backend Diagnostic ==========\n');

// Check 1: Excel file
console.log('1. Checking Excel file...');
if (fs.existsSync('py-cutoff.xlsx')) {
  console.log('   ✓ py-cutoff.xlsx found');
  try {
    const workbook = XLSX.readFile('py-cutoff.xlsx');
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    console.log(`   ✓ ${data.length} rows in Excel file`);
  } catch (e) {
    console.log(`   ✗ Error reading Excel: ${e.message}`);
  }
} else {
  console.log('   ✗ py-cutoff.xlsx NOT found - PLACE FILE IN ROOT DIRECTORY');
}

// Check 2: MongoDB Connection
console.log('\n2. Checking MongoDB...');
async function checkMongo() {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/acpc";

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000
    });
    console.log('   ✓ Connected to MongoDB');

    // Check College collection
    const College = mongoose.model('College', {});
    try {
      const collegeModel = require('./backend/models/College');
      const count = await collegeModel.countDocuments();
      console.log(`   ✓ ${count} colleges in database`);
      
      if (count > 0) {
        const sample = await collegeModel.findOne();
        console.log(`   ✓ Sample college: ${sample.instituteName}`);
      } else {
        console.log('   ✗ NO COLLEGES IN DATABASE - Run: node importColleges.js');
      }
    } catch (e) {
      console.log(`   ✗ Error reading College model: ${e.message}`);
    }

    await mongoose.connection.close();
  } catch (error) {
    console.log(`   ✗ MongoDB not running - Start MongoDB first`);
    console.log(`   Help: Start MongoDB or run: mongod --dbpath "C:\\data\\db"`);
  }
}

// Check 3: Backend files
console.log('\n3. Checking backend files...');
const files = [
  'backend/server.js',
  'backend/models/College.js',
  'backend/routes/college.js'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    console.log(`   ✓ ${f} exists`);
  } else {
    console.log(`   ✗ ${f} missing`);
  }
});

// Check 4: Frontend
console.log('\n4. Checking frontend files...');
if (fs.existsSync('showmycolleges.html')) {
  console.log('   ✓ showmycolleges.html exists');
} else {
  console.log('   ✗ showmycolleges.html missing');
}

checkMongo().then(() => {
  console.log('\n========== Diagnostic Complete ==========\n');
  console.log('SETUP CHECKLIST:');
  console.log('[ ] 1. py-cutoff.xlsx placed in root directory');
  console.log('[ ] 2. MongoDB running (mongod.exe)');
  console.log('[ ] 3. Run: node importColleges.js');
  console.log('[ ] 4. Run: cd backend && node server.js');
  console.log('[ ] 5. Open predictcollege.html in browser\n');
});
