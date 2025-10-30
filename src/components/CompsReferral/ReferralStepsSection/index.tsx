import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import globalStyles from '@site/src/pages/index.module.css';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';

interface ReferralStepsSectionProps {
  currentLocale?: string;
}

const ReferralStepsSection: React.FC<ReferralStepsSectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;
  
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const currentStep = CONTENT.steps[activeStep];

  return (
    <section className={`${styles.stepsSection} ${isVisible ? styles.fadeIn : ''}`}>
      <div className={globalStyles.sectionContent}>
        <div className={styles.sectionHeader}>
          <h2 className={globalStyles.sectionTitle}>{CONTENT.title}</h2>
          <p className={globalStyles.sectionSubtitle}>{CONTENT.subtitle}</p>
        </div>

        <div className={styles.stepsContainer}>
          {/* 左侧标签页 */}
          <div className={styles.tabsContainer}>
            {CONTENT.steps.map((step, index) => (
              <div
                key={step.number}
                className={`${styles.tabItem} ${activeStep === index ? styles.tabActive : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <div className={styles.tabNumber}>{step.number}</div>
                <div className={styles.tabContent}>
                  <h3 className={styles.tabTitle}>{step.title}</h3>
                  <p className={styles.tabDescription}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 右侧图片展示 */}
          <div className={styles.imageContainer}>
            <div className={styles.stepImageWrapper}>
              <img 
                key={`${currentStep.number}-${currentLocale}`}
                src={currentStep.image} 
                alt={currentStep.title}
                className={styles.stepImage}
                onLoad={(e) => {
                  // 图片加载成功，确保图片显示，占位符隐藏
                  (e.target as HTMLImageElement).style.display = 'block';
                  const placeholder = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = 'none';
                }}
                onError={(e) => {
                  // 如果图片加载失败，显示占位符
                  (e.target as HTMLImageElement).style.display = 'none';
                  const placeholder = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <div className={styles.stepImagePlaceholder} style={{ display: 'none' }}>
                <div className={styles.stepIcon}>{currentStep.icon}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralStepsSection;

