import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ScrollAnimation from '../ScrollAnimation';
import { CONTENT } from './constant';

const IDESection: React.FC = () => {
  return (
    <ScrollAnimation animationType="fadeInUp" duration={500}>
      <section className={`${styles.ideSection} ${globalStyles.gradientBackground}`}>
        <div className={styles.container}>
          <ScrollAnimation animationType="fadeInUp" delay={100}>
            <div className={styles.header}>
              <h2 className={globalStyles.sectionTitle}>{CONTENT.title}</h2>
              <p className={styles.subtitle}>
                {CONTENT.subtitle}
              </p>
            </div>
          </ScrollAnimation>

          {/* 核心特性部分 - 左右结构 */}
          <ScrollAnimation animationType="fadeInUp" delay={200}>
            <div className={styles.coreFeatures}>
              <div className={styles.featuresGrid}>
                {CONTENT.coreFeatures.map((feature, index) => (
                  <ScrollAnimation
                    key={index}
                    animationType="fadeInUp"
                    delay={300 + index * 100}
                  >
                    <div className={`${styles.featureCard} ${index % 2 === 1 ? styles.reverseCard : ''}`}>
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
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDescription}>{feature.description}</p>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* 可视化开发模块部分 - 2行卡片自动滚动 */}
          <div className={styles.developmentModules}>
            <div className={styles.modulesGrid}>
              <div className={styles.modulesRow}>
                {CONTENT.developmentModules.slice(0, Math.ceil(CONTENT.developmentModules.length / 2)).map((module, index) => (
                  <div key={`row1-${index}`} className={styles.moduleCard}>
                    <div className={styles.moduleContent}>
                      <div className={styles.moduleHeader}>
                        <h4 className={styles.moduleTitle}>{module.title}</h4>
                        <svg className={styles.arrowIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"/>
                          <polyline points="7,7 17,7 17,17"/>
                        </svg>
                      </div>
                      <p className={styles.moduleDescription}>{module.description}</p>
                    </div>
                  </div>
                ))}
                {/* 重复第一行卡片，实现无缝循环 */}
                {CONTENT.developmentModules.slice(0, Math.ceil(CONTENT.developmentModules.length / 2)).map((module, index) => (
                  <div key={`row1-repeat-${index}`} className={styles.moduleCard}>
                    <div className={styles.moduleContent}>
                      <div className={styles.moduleHeader}>
                        <h4 className={styles.moduleTitle}>{module.title}</h4>
                        <svg className={styles.arrowIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"/>
                          <polyline points="7,7 17,7 17,17"/>
                        </svg>
                      </div>
                      <p className={styles.moduleDescription}>{module.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.modulesRow}>
                {CONTENT.developmentModules.slice(Math.ceil(CONTENT.developmentModules.length / 2)).map((module, index) => (
                  <div key={`row2-${index}`} className={styles.moduleCard}>
                    <div className={styles.moduleContent}>
                      <div className={styles.moduleHeader}>
                        <h4 className={styles.moduleTitle}>{module.title}</h4>
                        <svg className={styles.arrowIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"/>
                          <polyline points="7,7 17,7 17,17"/>
                        </svg>
                      </div>
                      <p className={styles.moduleDescription}>{module.description}</p>
                    </div>
                  </div>
                ))}
                {/* 重复第二行卡片，实现无缝循环 */}
                {CONTENT.developmentModules.slice(Math.ceil(CONTENT.developmentModules.length / 2)).map((module, index) => (
                  <div key={`row2-repeat-${index}`} className={styles.moduleCard}>
                    <div className={styles.moduleContent}>
                      <div className={styles.moduleHeader}>
                        <h4 className={styles.moduleTitle}>{module.title}</h4>
                        <svg className={styles.arrowIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"/>
                          <polyline points="7,7 17,7 17,17"/>
                        </svg>
                      </div>
                      <p className={styles.moduleDescription}>{module.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
};

export default IDESection;