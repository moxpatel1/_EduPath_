const mongoose = require('mongoose');
const XLSX = require('xlsx');
const path = require("path");
const College = require('./backend/models/College');

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

async function importColleges() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/acpc";

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    console.log('MongoDB connected');

    // Read Excel file
    const workbook = XLSX.readFile('py-cutoff.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log(`Found ${data.length} rows in Excel file`);
    console.log('Sample row:', JSON.stringify(data[0], null, 2));

    // Clear existing data
    await College.deleteMany({});
    console.log('Cleared existing college data');

    // Helper function to parse numeric values
    const parseNumber = (val) => {
      if (!val) return 0;
      const num = parseInt(String(val).replace(/,/g, ''));
      return isNaN(num) ? 0 : num;
    };

    // Helper function to parse boolean values
    const parseBoolean = (val) => {
      if (!val) return false;
      return String(val).toLowerCase().includes('yes') || 
             String(val).toLowerCase().includes('available') ||
             String(val).toLowerCase() === 'true';
    };

    // Transform and insert data
    const colleges = data.map(row => {
      // Extract all possible column name variations
      const rank = parseNumber(
        row['Cutoff Rank'] || row['ACPC Rank'] || row['Rank'] || 
        row['cutoff_rank'] || row['acpc_rank'] || row['rank']
      );

      return {
        instituteName: row['Institute Name'] || row['institute_name'] || row['College Name'] || row['college_name'] || row['Name'] || 'Unknown',
        city: row['City'] || row['city'] || row['Location'] || row['location'] || 'Unknown',
        branch: row['Branch'] || row['branch'] || row['Course'] || row['course'] || 'General',
        category: row['Category'] || row['category'] || 'General',
        cutoffRank: rank,
        fees: row['Fees'] || row['fees'] || row['Fee'] || row['fee'] || 'Contact College',
        hostelBoys: parseBoolean(row['Hostel Boys'] || row['hostel_boys'] || row['Boys Hostel'] || row['boys_hostel']),
        hostelGirls: parseBoolean(row['Hostel Girls'] || row['hostel_girls'] || row['Girls Hostel'] || row['girls_hostel']),
        transportation: parseBoolean(row['Transportation'] || row['transportation'] || row['Transport'] || row['transport'])
      };
    }).filter(college => college.cutoffRank > 0); // Filter out invalid entries

    await College.insertMany(colleges);
    console.log(`Imported ${colleges.length} colleges successfully`);
    console.log(`First college:`, colleges[0]);

    process.exit(0);
  } catch (error) {
    console.error('Import failed:', error.message);
    process.exit(1);
  }
}

importColleges();
