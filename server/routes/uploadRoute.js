const express = require('express');
const multer = require('multer');
const path = require('path');
const { processFile } = require('../utils/fileProcessor');

const uploadRouter = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
   storage,
  
  });

uploadRouter.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      console.error("File not received in the request");
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];

    if (!allowedTypes.includes(req.file.mimetype)) {
      console.error("Invalid file type:", req.file.mimetype);
      return res.status(400).json({ error: 'Invalid file type' });
    }

    console.log("Uploaded File Info:", req.file);
    const filePath = req.file.path;


    // Process the uploaded file
    const jsonData = processFile(filePath);

    req.app.locals.userData = jsonData;

    console.log("Processed Data:", jsonData);
    res.status(200).json({ message: 'File uploaded and processed', data: jsonData });
  } catch (error) {
   console.error("Error occurred while uploading or processing file:", error.message || error);
    res.status(500).json({ error: 'Error processing file' });
  }
});

module.exports = uploadRouter;












