import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface PricingContactSectionProps {
  currentLocale?: string;
}

const PricingContactSection: React.FC<PricingContactSectionProps> = ({ currentLocale }) => {
  const [animateElements, setAnimateElements] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateElements(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.contactSection} ${animateElements ? styles.contactAnimate : ''}`}>
      <h2 className={styles.contactTitle}>准备开始您的AI应用开发之旅？</h2>
      <p className={styles.contactSubtitle}>
        联系我们的销售团队，获取最适合您需求的许可证方案
      </p>
      <a href="mailto:sales@jit.pro" className={styles.contactButton}>
        <span className={styles.buttonText}>联系我们</span>
        <span className={styles.buttonIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </span>
      </a>
    </div>
  );
};

export default PricingContactSection;
