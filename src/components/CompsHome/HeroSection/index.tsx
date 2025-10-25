import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import globalStyles from '../../../pages/index.module.css';
import CONTENT_ZH from './constant-zh';
import CONTENT_EN from './constant-en';


const HeroSection: React.FC<{ currentLocale?: string }> = ({ currentLocale }) => {
  const [isMobile, setIsMobile] = useState(false);

  const content = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section id="section-0" className={styles.hero}>

      <div className={globalStyles.sectionContent}>
        <div className={styles.heroLeft}>
                {/* 主标题区域 */}
                <div className={styles.titleSection}>
                  <div className={styles.heroTitleContainer}>
                    <h1 className={styles.heroTitle}>
                      {content.mainTitle.split(content.highlightTitle)[0]}
                      <span className={styles.highlightTitle}>{content.highlightTitle}</span>
                      {content.mainTitle.split(content.highlightTitle)[1]}
                    </h1>
                  </div>
                </div>

          {/* 行动按钮区域 */}
          <div className={styles.heroButtons}>
            <a className={`${styles.primaryButton}`} href="./download" >
              <span className={styles.buttonText}>
                {content.buttonDownload}
              </span>
              <span className={styles.buttonIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </span>
            </a>
            <a className={styles.secondaryButton} href={isMobile ? "./docs/tutorial" : "https://demo.jit.pro"} target="_blank">
              <span className={styles.buttonText}>
                {isMobile ? content.buttonGetStart : content.buttonDemo}
              </span>
              <span className={styles.buttonIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </span>
            </a>
          </div>
        </div>

        <div className={styles.cardsGrid}>
              {content.cards.map((card, index) => (
                  <div
                    className={`${globalStyles.baseCard} ${styles.card}`}
                  >
                    <div className={styles.cardHeader}>
                      <h3>{card.title}</h3>
                    </div>
                    <p className={styles.cardDescription} dangerouslySetInnerHTML={{ __html: card.description }} />
                  </div>
              ))}
            </div>
      </div>
    </section>
  );
};

export default HeroSection;
