import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const [currentLang, setCurrentLang] = useState<'zh' | 'en'>('en');

  useEffect(() => {
    // 根据当前路径判断语言
    const path = window.location.pathname;
    if (path.startsWith('/zh')) {
      setCurrentLang('zh');
    } else {
      setCurrentLang('en');
    }
  }, []);

  const handleLanguageSwitch = () => {
    const currentPath = window.location.pathname;
    let newPath = '';
    
    if (currentLang === 'en') {
      // 切换到中文
      if (currentPath === '/') {
        newPath = '/zh';
      } else {
        newPath = `/zh${currentPath}`;
      }
    } else {
      // 切换到英文
      if (currentPath === '/zh' || currentPath === '/zh/') {
        newPath = '/';
      } else {
        newPath = currentPath.replace('/zh', '');
      }
    }
    
    window.location.href = newPath;
  };

  return (
    <div className={`${styles.languageSwitcher} ${className || ''}`}>
      <button 
        className={styles.switchButton}
        onClick={handleLanguageSwitch}
        aria-label={currentLang === 'zh' ? 'Switch to English' : '切换到中文'}
        title={currentLang === 'zh' ? 'Switch to English' : '切换到中文'}
      >
        <svg 
          className={styles.globeIcon}
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M2 12h20" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <span className={styles.currentLang}>
          {currentLang === 'zh' ? 'EN' : '中文'}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
