import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleExtractText = async () => {
    if (!selectedFile) {
      alert('Please upload a file first');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);  

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData);
      console.log(response.data);
      setExtractedText(response.data.extracted_text);
    } catch (error) {
      console.error('Error extracting text:', error);
      setExtractedText('Failed to extract text.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Upload Image and Extract Text</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleExtractText}>Extract Text</button>
      <div style={{ marginTop: '20px' }}>
        <h2>Extracted Text:</h2>
        <p>{extractedText || 'No text extracted yet.'}</p>
      </div>
    </div>
  );
}

export default App;
