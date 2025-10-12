import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.css';
import OCRScanner from '../components/OCRScanner';
import LanguageSelector from '../components/LanguageSelector';

const HomePage = ({ onScanComplete }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleScanComplete = (data) => {
    onScanComplete(data);
    navigate('/user-details', { state: { accountNumber: data.accountNumber, ifscCode: data.ifscCode } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundPattern}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className={styles.title}>{t('welcome')}</h1>
          <p className={styles.subtitle}>{t('preparePassbook')}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.languageSection}>
            <LanguageSelector />
          </div>
          
          <div className={styles.scannerSection}>
            <div className={styles.scannerHeader}>
              <h2 className={styles.scannerTitle}>Scan Your Passbook</h2>
              <p className={styles.scannerDescription}>
                Position your passbook in front of the camera for automatic scanning
              </p>
            </div>
            
            <OCRScanner onScanComplete={handleScanComplete} />
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Secure Processing</h3>
                <p>Your data is encrypted and processed securely</p>
              </div>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Fast Recognition</h3>
                <p>Advanced OCR technology for quick data extraction</p>
              </div>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Accurate Results</h3>
                <p>High precision data extraction from your documents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// import React, { useState } from 'react';
// import { Button } from '@shadcn/react/button';
// import { Select, SelectItem } from '@shadcn/react/select';
// import { Spinner } from '@shadcn/react/spinner';
// import { useNavigate } from 'react-router-dom';

// const HomePage = ({ onScanComplete }) => {
//   const [isScanning, setIsScanning] = useState(false);
//   const navigate = useNavigate();

//   const handleScan = () => {
//     setIsScanning(true);
//     setTimeout(() => {
//       const mockData = {
//         accountNumber: '123456789',
//         ifscCode: 'IFSC0012345',
//       };
//       setIsScanning(false);
//       onScanComplete(mockData);
//       navigate('/user-details', { state: { user: mockData } });
//     }, 2000);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//       <h1 className="text-2xl font-semibold mb-4">Keep Your Passbook for Scanning</h1>
//       <Select className="mb-4">
//         <SelectItem value="en">English</SelectItem>
//         <SelectItem value="hi">Hindi</SelectItem>
//         <SelectItem value="ta">Tamil</SelectItem>
//       </Select>
//       <Button onClick={handleScan} disabled={isScanning}>
//         {isScanning ? (
//           <>
//             <Spinner size="sm" className="mr-2" /> Scanning...
//           </>
//         ) : (
//           'Start Scan'
//         )}
//       </Button>
//     </div>
//   );
// };

// export default HomePage;
