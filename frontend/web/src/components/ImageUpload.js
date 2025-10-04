import React, { useState } from 'react';
import { itemService } from '../services/api';

function ImageUpload({ onItemClassified }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Get location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await classifyImage(file, {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {
        // Fallback location
        classifyImage(file, { lat: 40.7128, lng: -74.0060 });
      }
    );
  };

  const classifyImage = async (file, location) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('location', JSON.stringify(location));

      const response = await itemService.classifyItem(formData);
      onItemClassified(response.data);
      setPreview(null);
    } catch (error) {
      alert('Failed to classify image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card">
      <h3>Add New Item</h3>
      
      {preview && (
        <div style={{marginBottom: '15px'}}>
          <img 
            src={preview} 
            alt="Preview" 
            style={{width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px'}}
          />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
        style={{marginBottom: '15px'}}
      />

      {uploading && (
        <div style={{textAlign: 'center', padding: '20px'}}>
          <p>🤖 AI is classifying your item...</p>
          <div style={{
            width: '100%',
            height: '4px',
            background: '#f0f0f0',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: '#007AFF',
              animation: 'loading 2s infinite'
            }}></div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export default ImageUpload;