const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// List files to find Excel file
const rootDir = process.cwd();
const files = fs.readdirSync(rootDir);
console.log('Files in directory:', files.filter(f => f.endsWith('.xlsx') || f.endsWith('.xls')));

// Try to find and read the Excel file
const excelFile = files.find(f => f.includes('cutoff') || f.endsWith('.xlsx'));

if (excelFile) {
  try {
    const workbook = XLSX.readFile(excelFile);
    console.log('\n✓ Found Excel file:', excelFile);
    console.log('Sheet names:', workbook.SheetNames);
    
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`\n✓ Total rows: ${data.length}`);
    console.log('\nColumn headers:');
    if (data.length > 0) {
      Object.keys(data[0]).forEach(header => console.log(`  - ${header}`));
      console.log('\nFirst 3 rows:');
      console.log(JSON.stringify(data.slice(0, 3), null, 2));
    }
  } catch (error) {
    console.error('Error reading file:', error.message);
  }
} else {
  console.log('No Excel file found. Looking for any files...');
}
