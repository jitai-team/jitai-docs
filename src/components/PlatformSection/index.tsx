import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ImageComponent from './ImageComponents';
import ScrollAnimation from '../ScrollAnimation';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';


interface PlatformSectionProps {
  currentLocale: string;
}

const PlatformSection: React.FC<PlatformSectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

  return (
    <ScrollAnimation animationType="fadeInUp" duration={500}>
      <section
        id="section-platform"
        className={`${styles.platformSection} ${globalStyles.gradientBackground}`}
        style={{
          '--section-color': CONTENT.color,
          '--card-color': CONTENT.color,
        } as React.CSSProperties}
      >
        <div className={globalStyles.sectionContent}>
          <ScrollAnimation animationType="fadeInUp" delay={100}>
            <h2 className={globalStyles.sectionTitle}>{CONTENT.title}</h2>
          </ScrollAnimation>
          <ScrollAnimation animationType="fadeInUp" delay={200}>
            <p className={styles.sectionSubtitle}>
              {CONTENT.subtitle}
            </p>
          </ScrollAnimation>
          <div className={styles.featuresGrid}>
            {CONTENT.features.map((feature, index) => (
              <ScrollAnimation
                key={index}
                delay={300 + index * 60}
                duration={400}
              >
                <div
                  className={`${globalStyles.baseCard} ${styles.featureCard} animatedChild`}
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
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
};

export default PlatformSection;