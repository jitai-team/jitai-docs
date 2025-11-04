import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../../pages/index.module.css';
import ImageComponent from './ImageComponents';
import ScrollAnimation from '../../ScrollAnimation';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';


interface PlatformSectionProps {
  currentLocale?: string;
}

const PlatformSection: React.FC<PlatformSectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

  return (
    <section
      id="section-platform"
      className={`${styles.platformSection} ${globalStyles.gradientBackground}`}
      style={{
        '--section-color': CONTENT.color,
        '--card-color': CONTENT.color,
      } as React.CSSProperties}
    >
      <div className={globalStyles.sectionContent}>
        <h2 className={globalStyles.sectionTitle}>{CONTENT.title}</h2>
        <p className={styles.sectionSubtitle}>
          {CONTENT.subtitle}
        </p>
        <div className={styles.featuresGrid}>
          {CONTENT.features.map((feature, index) => (
            <div
              className={`${globalStyles.baseCard} ${styles.featureCard} animatedChild`}
              key={index}
            // style={{
            //   '--card-color': CONTENT.color,
            // } as React.CSSProperties}
            >
              <div className={styles.featureImage}>
                <ImageComponent imageKey={feature.imageKey} />
              </div>
              <div className={styles.featureContent}>
                <div className={styles.featureHeader}>
                  <h3>{feature.title}</h3>
                </div>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;