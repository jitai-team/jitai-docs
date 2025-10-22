import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../../pages/v1.module.css';
import ScrollAnimation from '../../ScrollAnimation';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';

interface FrameworkSectionProps {
  currentLocale?: string;
}

const FrameworkSection: React.FC<FrameworkSectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

  return (
    <ScrollAnimation animationType="fadeInUp" duration={500}>
      <section
        id="section-framework"
        className={`${styles.frameworkSection} ${globalStyles.gradientBackground}`}
        style={{
          '--section-color': CONTENT.color,
          '--card-color': CONTENT.color,
        } as React.CSSProperties}
      >
        <div className={globalStyles.sectionContent}>
          <ScrollAnimation animationType="fadeInUp" delay={100}>
            <div className={styles.headerSection}>
              <h2 className={globalStyles.sectionTitle}>{CONTENT.title}</h2>
              <p className={styles.sectionSubtitle}>
                {CONTENT.subtitle}
              </p>
            </div>
          </ScrollAnimation>

          <div className={styles.frameworksGrid}>
            {CONTENT.frameworks.map((framework, index) => (
              <ScrollAnimation
                key={index}
                animationType="scaleIn"
                delay={200 + index * 50}
                duration={400}
              >
                <a
                  href={`/docs/reference/framework/${framework.name}`}
                  target="_blank"
                  className={`${globalStyles.baseCard} ${styles.frameworkCard} ${styles.frameworkLink} animatedChild`}
                  // style={{ '--card-color': framework.color } as React.CSSProperties}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                      <span className={styles.iconEmoji}>{framework.icon}</span>
                    </div>
                    <h3 className={styles.frameworkName}>{framework.name}</h3>
                  </div>
                  <p className={styles.frameworkDescription}>{framework.description}</p>
                  <div className={styles.linkIndicator}>
                    <span>{CONTENT.learnMore}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </a>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
};

export default FrameworkSection;