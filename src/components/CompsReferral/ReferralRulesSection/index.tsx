import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import globalStyles from '@site/src/pages/index.module.css';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';

interface ReferralRulesSectionProps {
  currentLocale?: string;
}

const ReferralRulesSection: React.FC<ReferralRulesSectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`${styles.rulesSection} ${isVisible ? styles.fadeIn : ''}`}>
      <div className={globalStyles.sectionContent}>
        <div className={styles.sectionHeader}>
          <h2 className={globalStyles.sectionTitle}>{CONTENT.title}</h2>
          <p className={globalStyles.sectionSubtitle}>{CONTENT.subtitle}</p>
        </div>
        
        <div className={styles.rulesContainer}>
          <ul className={styles.rulesList}>
            {CONTENT.rules.map((rule, index) => (
              <li key={index} className={styles.ruleItem}>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ReferralRulesSection;

