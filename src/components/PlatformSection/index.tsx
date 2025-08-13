import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ScrollAnimation from '../ScrollAnimation';
import { CONTENT } from './constant';
import ImageComponent from './ImageComponents';




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