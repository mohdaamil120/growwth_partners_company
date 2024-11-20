const xlsx = require('xlsx');
const fs = require('fs');

// const processFile = (filePath) => {
//   const workbook = xlsx.readFile(filePath);
//   const sheetName = workbook.SheetNames[0];
//   const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

//   // Delete the file after processing
//   fs.unlinkSync(filePath);

//   return jsonData;
// };



const processFile = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    console.log("File processed successfully:", jsonData);
    // Delete the file after processing
    // fs.unlinkSync(filePath);

    return jsonData;
  } catch (error) {
    console.error("Error processing file line 28:", error);
    throw new Error('Error processing the file');
  }
};



module.exports = { processFile };
