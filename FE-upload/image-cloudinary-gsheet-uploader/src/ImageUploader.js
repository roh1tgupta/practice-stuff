import React, { useState } from 'react';

const CLOUDINARY_UPLOAD_PRESET = 'blog_media'; // <-- Replace with your Cloudinary upload preset
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME'; // <-- Replace with your Cloudinary cloud name
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

function ImageUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageUrl('');
    setError('');
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await fetch(CLOUDINARY_API_URL, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        onUpload(data.secure_url);
      } else {
        setError('Upload failed. Check Cloudinary credentials.');
      }
    } catch (err) {
      setError('Upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || uploading} style={{ marginLeft: 8 }}>
        {uploading ? 'Uploading...' : 'Upload to Cloudinary'}
      </button>
      {imageUrl && (
        <div style={{ marginTop: 16 }}>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: 300 }} />
          <div><a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></div>
        </div>
      )}
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
}

export default ImageUploader;
