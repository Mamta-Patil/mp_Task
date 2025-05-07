'use client';
import { useState } from 'react';

export default function UploadSection() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedLinks, setUploadedLinks] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));  // Store selected files
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage('Please select files first.');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));  // Prepare files for upload

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setUploadedLinks(data.files);  // Update links to show uploaded files
        setFiles([]);  // Clear files after successful upload
      } else {
        setMessage('Upload failed. Please try again.');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('Upload error. Check the console for details.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Upload Your Documents</h3>

      {/* File Input */}
      <input 
        type="file" 
        multiple 
        onChange={handleFileChange} 
        className="mb-4 border p-2 rounded" 
      />

      {/* Upload Button */}
      <button
        type="button"
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload Files'}
      </button>

      {/* Display file names */}
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium">Selected Files:</h4>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display upload status/message */}
      {message && <p className="mt-2 text-sm text-blue-800">{message}</p>}

      {/* Display uploaded file links */}
      {uploadedLinks.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium">Uploaded Files:</h4>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {uploadedLinks.map((url, i) => (
              <li key={i}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
