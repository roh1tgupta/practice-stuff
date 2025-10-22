
import React, { useEffect, useState } from 'react';
import ImageUploader from './ImageUploader';
import { useGoogleSheets } from './useGoogleSheets';
// Placeholder for Google Sheets API endpoint
const GOOGLE_SHEETS_API_URL = 'YOUR_GOOGLE_SHEETS_API_ENDPOINT'; // <-- Replace with your endpoint

function App() {
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [sheetStatus, setSheetStatus] = useState('');

  const { isReady, isSignedIn, signIn, appendToSheet, error } = useGoogleSheets();

  useEffect(() => {
    if (!isSignedIn) {
      signIn();
    }

    if(isReady && isSignedIn) {
      // appendToSheet('https://res.cloudinary.com/dpyyjse3a/image/upload/v1760367593/bcfjai74iqsbzenbtbrv.png')
      console.log("Google Sheets API is ready and signed in.");
    }
  }, [isSignedIn, isReady])

  const handleUpload = async (url) => {
    setCloudinaryUrl(url);
    setSheetStatus('');
    // Send the URL to Google Sheets (placeholder logic)
    try {
      await appendToSheet(url)
        setSheetStatus('Saved to Google Sheet!');
    } catch (err) {
      setSheetStatus('Error saving to Google Sheet: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Image Upload to Cloudinary & Google Sheet</h2>
      <ol>
        <li>Choose an image and upload to Cloudinary.</li>
        <li>The Cloudinary URL will be sent to your Google Sheet.</li>
      </ol>
      <ImageUploader onUpload={handleUpload} />
      {cloudinaryUrl && (
        <div style={{ marginTop: 24 }}>
          <strong>Cloudinary URL:</strong> <a href={cloudinaryUrl} target="_blank" rel="noopener noreferrer">{cloudinaryUrl}</a>
        </div>
      )}
      {sheetStatus && <div style={{ marginTop: 16, color: sheetStatus.includes('Error') ? 'red' : 'green' }}>{sheetStatus}</div>}
      <div style={{ marginTop: 32, fontSize: 14, color: '#555' }}>
        <strong>Note:</strong> Update Cloudinary and Google Sheets credentials in the code.<br />
        This is a demo. For production, secure your API endpoints and credentials.
      </div>
    </div>
  );
}

export default App;
