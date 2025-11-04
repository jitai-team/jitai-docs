import React from 'react';
import styles from './styles.module.css';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';

interface MacSecurityPageProps {
  currentLocale?: string;
}

const MacSecurityPage: React.FC<MacSecurityPageProps> = ({ 
  currentLocale = 'zh'
}) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

  return (
    <div className={styles.pageContent}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{CONTENT.title}</h1>
      </div>
      <div className={styles.pageBody}>
        <p className={styles.pageText}>{CONTENT.content}</p>
        <div className={styles.pageImage}>
          <img
            src={CONTENT.imageUrl}
            alt="macOS Security Warning"
            className={styles.securityImage}
          />
        </div>
      </div>
    </div>
  );
};

export default MacSecurityPage;
