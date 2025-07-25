import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ScrollAnimation from '../ScrollAnimation';
import { CONTENT } from './constant';

interface ModuleCardProps {
  module: {
    title: string;
    description: string;
  };
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => (
  <div className={styles.moduleCard}>
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
);

const IDESection: React.FC = () => {
  return (
    <ScrollAnimation animationType="fadeInUp" duration={500}>
      <section className={`${styles.ideSection} ${globalStyles.gradientBackground}`}
        style={{
          '--section-color': CONTENT.color,
          '--card-color': CONTENT.color,
        } as React.CSSProperties}
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
                        {feature.video ? (
                          <div className={styles.videoContainer}>
                            <video
                              src={feature.video}
                              autoPlay
                              loop
                              muted
                              playsInline
                              controls
                              className={styles.videoElement}
                            />
                            <div className={styles.videoOverlay}>
                            </div>
                          </div>
                        ) : (
                          <div className={globalStyles.imagePlaceholder} />
                        )}
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
                  <ModuleCard key={`row1-${index}`} module={module} />
                ))}
                {/* 重复第一行卡片，实现无缝循环 */}
                {CONTENT.developmentModules.slice(0, Math.ceil(CONTENT.developmentModules.length / 2)).map((module, index) => (
                  <ModuleCard key={`row1-repeat-${index}`} module={module} />
                ))}
              </div>
              <div className={styles.modulesRow}>
                {CONTENT.developmentModules.slice(Math.ceil(CONTENT.developmentModules.length / 2)).map((module, index) => (
                  <ModuleCard key={`row2-${index}`} module={module} />
                ))}
                {/* 重复第二行卡片，实现无缝循环 */}
                {CONTENT.developmentModules.slice(Math.ceil(CONTENT.developmentModules.length / 2)).map((module, index) => (
                  <ModuleCard key={`row2-repeat-${index}`} module={module} />
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