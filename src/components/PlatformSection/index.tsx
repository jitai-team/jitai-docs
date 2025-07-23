import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ScrollAnimation from '../ScrollAnimation';
import { CONTENT } from './constant';

const PlatformSection: React.FC = () => {
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
                      <div className={globalStyles.imagePlaceholder}>
                        <div className={globalStyles.placeholderIcon}>
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21,15 16,10 5,21"/>
                          </svg>
                        </div>
                      </div>
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