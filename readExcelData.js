const XLSX = require('xlsx');

// Read the Excel file
const workbook = XLSX.readFile('py-cutoff.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

console.log('✓ Excel file loaded successfully');
console.log(`✓ Total rows: ${data.length}\n`);

// Display headers
if (data.length > 0) {
  console.log('Column Headers:');
  const headers = Object.keys(data[0]);
  headers.forEach(h => console.log(`  • ${h}`));
  
  console.log('\nFirst 2 rows sample:');
  console.log(JSON.stringify(data.slice(0, 2), null, 2));
  
  // Convert and save as JSON
  require('fs').writeFileSync('colleges.json', JSON.stringify(data, null, 2));
  console.log('\n✓ Data exported to colleges.json');
} else {
  console.log('No data found in Excel file');
}
