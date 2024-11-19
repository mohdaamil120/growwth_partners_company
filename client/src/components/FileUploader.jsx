import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('https://growwth-partners-ft04.onrender.com/api/upload', formData);
    console.log('File Data:', response.data);
  };

  return (
    <div className="file-uploader">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload File</button>
    </div>
  );
};

export default FileUploader;
