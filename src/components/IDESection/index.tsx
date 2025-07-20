import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ScrollAnimation from '../ScrollAnimation';
import { CONTENT } from './constant';

const IDESection: React.FC = () => {
  return (
    <ScrollAnimation animationType="fadeInUp" duration={500}>
      <section
        className={`${styles.ideSection} ${globalStyles.gradientBackground}`}
      >
        <div className={styles.container}>
          <ScrollAnimation animationType="fadeInUp" delay={100}>
            <div className={styles.header}>
              <h2 className={globalStyles.sectionTitle}>{CONTENT.title}</h2>
              <p className={styles.subtitle}>
                {CONTENT.subtitle}
              </p>
            </div>
          </ScrollAnimation>

          {/* 核心特性部分 - 优化展示效果 */}
          <ScrollAnimation animationType="fadeInUp" delay={200}>
            <div className={styles.coreFeatures}>
              <div className={styles.coreFeaturesGrid}>
                {CONTENT.coreFeatures.map((feature, index) => (
                  <ScrollAnimation
                    key={index}
                    animationType="fadeInUp"
                    delay={300 + index * 200}
                    duration={600}
                  >
                    <div className={styles.coreFeatureCard}>
                      <div className={styles.coreFeatureImage}>
                        <div className={styles.imagePlaceholder}>
                          <div className={styles.placeholderIcon}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21,15 16,10 5,21"/>
                            </svg>
                          </div>
                          <span className={styles.placeholderText}>{feature.title}</span>
                        </div>
                      </div>
                      <div className={styles.coreFeatureContent}>
                        <h4 className={styles.coreFeatureTitle}>{feature.title}</h4>
                        <p className={styles.coreFeatureDescription}>{feature.description}</p>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* 可视化开发模块部分 - 优化网格布局 */}
          <ScrollAnimation animationType="fadeInUp" delay={400}>
            <div className={styles.developmentModules}>
              <div className={styles.modulesHeader}>
                <h3 className={styles.modulesTitle}>可视化开发模块</h3>
                <p className={styles.modulesSubtitle}>丰富的可视化开发工具，让开发更高效</p>
              </div>
              <div className={styles.modulesGrid}>
                {CONTENT.developmentModules.map((module, index) => (
                  <ScrollAnimation
                    key={index}
                    animationType="scaleIn"
                    delay={500 + index * 50}
                    duration={400}
                  >
                    <div className={styles.moduleCard}>
                      <div className={styles.moduleIcon}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14,2 14,8 20,8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                          <polyline points="10,9 9,9 8,9"/>
                        </svg>
                      </div>
                      <div className={styles.moduleContent}>
                        <h4 className={styles.moduleTitle}>{module.title}</h4>
                        <p className={styles.moduleDescription}>{module.description}</p>
                        <div className={styles.moduleLink}>
                          <span className={styles.linkText}>了解更多</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"/>
                            <polyline points="7,7 17,7 17,17"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </ScrollAnimation>
  );
};

export default IDESection;