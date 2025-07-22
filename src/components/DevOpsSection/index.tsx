import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ScrollAnimation from '../ScrollAnimation';
import { CONTENT } from './constant';

const DevOpsSection: React.FC = () => {
  // 将features重新组织为每行2个卡片的布局
  const featuresRows = [];
  for (let i = 0; i < CONTENT.features.length; i += 2) {
    const row = [CONTENT.features[i]];
    if (i + 1 < CONTENT.features.length) {
      row.push(CONTENT.features[i + 1]);
    }
    featuresRows.push(row);
  }

  return (
    <ScrollAnimation animationType="fadeInUp" duration={500}>
      <section
        id="devops-section"
        className={`${styles.devopsSection} ${globalStyles.gradientBackground}`}
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
            {featuresRows.map((row, rowIndex) => {
              const isOddRow = rowIndex % 2 === 0; // 单数行（0-based索引）

              return (
                <ScrollAnimation
                  key={rowIndex}
                  animationType="fadeInUp"
                  delay={300 + rowIndex * 200}
                  duration={500}
                >
                  <div className={styles.featureRow}>
                    {row.map((feature, featureIndex) => {
                      const isWideCard = isOddRow
                        ? featureIndex === 0  // 单数行：左侧宽
                        : featureIndex === 1; // 偶数行：右侧宽

                      return (
                        <div
                          key={featureIndex}
                          className={`${styles.featureCard} ${
                            isWideCard ? styles.wideCard : styles.narrowCard
                          }`}
                        >
                          <div className={styles.featureImage}>
                            <div className={globalStyles.imagePlaceholder}>
                              <span className={globalStyles.placeholderText}>图片占位符</span>
                            </div>
                          </div>
                          <div className={styles.featureContent}>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
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