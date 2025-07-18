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
                          <span className={styles.placeholderText}>图片占位符</span>
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

          {/* 可视化开发模块部分 - 大幅减少展示面积 */}
          <ScrollAnimation animationType="fadeInUp" delay={400}>
            <div className={styles.developmentModules}>
              <div className={styles.modulesGrid}>
                {CONTENT.developmentModules.map((module, index) => (
                  <ScrollAnimation
                    key={index}
                    animationType="scaleIn"
                    delay={500 + index * 30}
                    duration={400}
                  >
                    <div className={styles.moduleCard}>
                      <div className={styles.moduleContent}>
                        <h4 className={styles.moduleTitle}>{module.title}</h4>
                        <p className={styles.moduleDescription}>{module.description}</p>
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