import React, { useState, useRef } from 'react';
import styles from './OCRScanner.module.css';

const OCRScanner = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setError('');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
      setError('');
    }
  };

  const handleScan = async () => {
    if (!image) {
      setError('Please select an image first.');
      return;
    }

    setIsScanning(true);
    setError('');
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8080/api/ocr/scan', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      onScanComplete(data);
    } catch (error) {
      console.error('Error scanning passbook:', error);
      setError('Failed to scan the image. Please try again.');
    }
    setIsScanning(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <div 
        className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''} ${image ? styles.hasImage : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        
        {image ? (
          <div className={styles.imagePreview}>
            <img 
              src={URL.createObjectURL(image)} 
              alt="Preview" 
              className={styles.previewImage}
            />
            <div className={styles.imageInfo}>
              <p className={styles.fileName}>{image.name}</p>
              <p className={styles.fileSize}>
                {(image.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button 
              className={styles.changeButton}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Change Image
            </button>
          </div>
        ) : (
          <div className={styles.uploadContent}>
            <div className={styles.uploadIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={styles.uploadTitle}>Upload Passbook Image</h3>
            <p className={styles.uploadDescription}>
              Drag and drop your passbook image here, or click to browse
            </p>
            <div className={styles.supportedFormats}>
              <span>Supports: JPG, PNG, PDF</span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <svg className={styles.errorIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
          {error}
        </div>
      )}

      <button
        onClick={handleScan}
        disabled={isScanning || !image}
        className={`${styles.scanButton} ${isScanning ? styles.scanning : ''}`}
      >
        {isScanning ? (
          <>
            <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
                <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
              </circle>
            </svg>
            Scanning...
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Start Scanning
          </>
        )}
      </button>
    </div>
  );
};

export default OCRScanner;
