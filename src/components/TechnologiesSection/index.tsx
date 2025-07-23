import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ScrollAnimation from '../ScrollAnimation';
import { CONTENT, remark } from './constant';

const TechnologiesSection: React.FC = () => {
  return (
    <ScrollAnimation animationType="fadeInUp" duration={500}>
      <section
        id="section-3"
        className={`${styles.technologiesSection} ${globalStyles.gradientBackground}`}
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
            <div className={styles.technologiesIntro}>
              <div className={styles.technologiesIntroText}>
                <div dangerouslySetInnerHTML={{ __html: CONTENT.remark }}></div>
              </div>
            </div>
          </ScrollAnimation>
          <div className={styles.technologiesGrid}>
            {CONTENT.cards.map((card, index) => (
              <ScrollAnimation
                key={index}
                animationType="fadeInLeft"
                delay={300 + index * 80}
                duration={500}
              >
                <div
                  className={`${globalStyles.baseCard} ${styles.technologyCard} animatedChild`}
                  style={{
                    '--card-color': card.color,
                  } as React.CSSProperties}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                      <span className={styles.iconEmoji}>{card.icon}</span>
                    </div>
                    <div className={styles.cardTitleSection}>
                      <h3>{card.title}</h3>
                      <p className={styles.cardSubtitle}>{card.subtitle}</p>
                    </div>
                  </div>
                  <div className={styles.technologyContent}>
                    <div className={styles.technologySection}>
                      <p dangerouslySetInnerHTML={{ __html: card.sections }}></p>
                    </div>
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

export default TechnologiesSection;