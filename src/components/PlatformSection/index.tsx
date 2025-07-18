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
        // style={{
        //   '--section-color': CONTENT.color,
        //   '--card-color': CONTENT.color,
        //   '--card-hover-color': CONTENT.color
        // } as React.CSSProperties}
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
                  //   '--card-color': feature.color,
                  //   '--card-hover-color': feature.color
                  // } as React.CSSProperties}
                >
                  <div className={styles.featureImage}>
                    <div className={styles.imagePlaceholder}>
                      <span className={styles.placeholderText}>图片占位符</span>
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