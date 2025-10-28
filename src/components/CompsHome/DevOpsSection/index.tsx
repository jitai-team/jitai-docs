import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../../pages/index.module.css';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';

interface DevOpsSectionProps {
  currentLocale?: string;
}

const DevOpsSection: React.FC<DevOpsSectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

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
    <section
      id="devops-section"
      className={`${styles.devopsSection} ${globalStyles.gradientBackground}`}
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

        <div className={styles.featuresContainer}>
          {featuresRows.map((row, rowIndex) => {
            const isOddRow = rowIndex % 2 === 0; // 单数行（0-based索引）

            return (
              <div className={styles.featureRow} key={rowIndex}>
                {row.map((feature, featureIndex) => {
                  const isWideCard = isOddRow
                    ? featureIndex === 0  // 单数行：左侧宽
                    : featureIndex === 1; // 偶数行：右侧宽

                  return (
                    <div
                      key={featureIndex}
                      className={`${globalStyles.baseCard} ${styles.featureCard} ${
                        isWideCard ? styles.wideCard : styles.narrowCard
                      }`}
                    >
                      <div className={styles.featureImage}>
                        {feature.image ? (
                          <img src={feature.image} alt={feature.imageAlt} />
                        ) : (
                          <div className={`${globalStyles.imagePlaceholder} ${styles.imagePlaceholder}`}>
                          </div>
                        )}
                      </div>
                      <div className={styles.featureContent}>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DevOpsSection;