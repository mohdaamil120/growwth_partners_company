const xlsx = require('xlsx');
const fs = require('fs');

const processFile = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Delete the file after processing
  fs.unlinkSync(filePath);

  return jsonData;
};

module.exports = { processFile };
