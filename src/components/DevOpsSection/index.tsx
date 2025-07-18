import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ScrollAnimation from '../ScrollAnimation';
import { CONTENT } from './constant';

const DevOpsSection: React.FC = () => {
  return (
    <ScrollAnimation animationType="fadeInUp" duration={500}>
      <section
        id="devops-section"
        className={`${styles.devopsSection} ${globalStyles.gradientBackground}`}
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

          <div className={styles.featuresContainer}>
            {CONTENT.features.map((feature, index) => {
              return (
                <ScrollAnimation
                  key={index}
                  animationType={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
                  delay={300 + index * 100}
                  duration={500}
                >
                  <div className={`${styles.featureRow} ${index % 2 === 0 ? styles.featureRowLeft : styles.featureRowRight}`}>
                    <div className={styles.featureImage}>
                      <div className={styles.imagePlaceholder}>
                        <span className={styles.placeholderText}>图片占位符</span>
                      </div>
                    </div>
                    <div className={styles.featureContent}>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
};

export default DevOpsSection;