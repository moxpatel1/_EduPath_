const XLSX = require('xlsx');
const fs = require('fs');

try {
  if (!fs.existsSync('py-cutoff.xlsx')) {
    console.log('ERROR: py-cutoff.xlsx not found in root directory');
    console.log('Place the Excel file here: c:\\Users\\patel\\OneDrive\\Desktop\\Sem-6\\EduPath-main\\py-cutoff.xlsx');
    process.exit(1);
  }

  const workbook = XLSX.readFile('py-cutoff.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json(worksheet);

  console.log(`Converting ${rawData.length} colleges from Excel to JSON...`);

  // Convert to proper format
  const colleges = rawData.map(row => {
    const parseNumber = (val) => {
      if (!val) return 0;
      const num = parseInt(String(val).replace(/,/g, ''));
      return isNaN(num) ? 0 : num;
    };

    const parseBoolean = (val) => {
      if (!val) return false;
      return String(val).toLowerCase().includes('yes') || 
             String(val).toLowerCase().includes('available') ||
             String(val).toLowerCase() === 'true';
    };

    return {
      instituteName: row['Institute Name'] || row['College Name'] || row['Name'] || 'Unknown',
      city: row['City'] || row['Location'] || 'Unknown',
      branch: row['Branch'] || row['Course'] || 'General',
      category: row['Category'] || 'General',
      cutoffRank: parseNumber(row['Cutoff Rank'] || row['ACPC Rank'] || row['Rank']),
      fees: row['Fees'] || row['Fee'] || 'Contact College',
      hostelBoys: parseBoolean(row['Hostel Boys'] || row['Boys Hostel']),
      hostelGirls: parseBoolean(row['Hostel Girls'] || row['Girls Hostel']),
      transportation: parseBoolean(row['Transportation'] || row['Transport'])
    };
  }).filter(c => c.cutoffRank > 0);

  fs.writeFileSync('colleges.json', JSON.stringify(colleges, null, 2));
  console.log(`✓ Successfully created colleges.json with ${colleges.length} colleges`);
  console.log(`✓ File ready for use in frontend`);

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
