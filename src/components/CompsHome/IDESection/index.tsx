import React, { useRef, useMemo } from 'react';
import styles from './styles.module.css';
import globalStyles from '../../../pages/index.module.css';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';
import LazyVideo from '../../LazyVideo';

// Fisher-Yates 洗牌算法
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface ModuleCardProps {
  module: {
    title: string;
    description: string;
    link?: string;
  };
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => (
  <div className={styles.moduleCard} onClick={() => {
    if (module.link) {
      window.open(module.link, '_blank');
    }
  }}>
    <div className={styles.moduleContent}>
      <div className={styles.moduleHeader}>
        <h4 className={styles.moduleTitle}>{module.title}</h4>
        <svg className={styles.arrowIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7,7 17,7 17,17" />
        </svg>
      </div>
      <p className={styles.moduleDescription}>{module.description}</p>
    </div>
  </div>
);

interface IDESectionProps {
  currentLocale?: string;
}

const IDESection: React.FC<IDESectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  
  // 随机排序开发模块（每次页面加载时随机一次）
  const shuffledModules = useMemo(() => shuffleArray(CONTENT.developmentModules), [CONTENT.developmentModules]);

  const handleVideoClick = (videoSrc: string, index: number) => {
    const videoElement = videoRefs.current[`video-${index}`];
    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if ((videoElement as any).webkitRequestFullscreen) {
        (videoElement as any).webkitRequestFullscreen();
      } else if ((videoElement as any).mozRequestFullScreen) {
        (videoElement as any).mozRequestFullScreen();
      } else if ((videoElement as any).msRequestFullscreen) {
        (videoElement as any).msRequestFullscreen();
      }
    }
  };

  return (
    <section className={`${styles.ideSection} ${globalStyles.gradientBackground}`}
      style={{
        '--section-color': CONTENT.color,
        '--card-color': CONTENT.color,
      } as React.CSSProperties}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={globalStyles.sectionTitle}>{CONTENT.title}</h2>
          <p className={styles.subtitle}>
            {CONTENT.subtitle}
          </p>
        </div>

        {/* 核心特性部分 - 左右结构 */}
        <div className={styles.coreFeatures}>
          <div className={styles.featuresGrid}>
            {CONTENT.coreFeatures.map((feature, index) => (
              <div className={`${styles.featureCard} ${index % 2 === 1 ? styles.reverseCard : ''}`} key={index}>
                <div className={styles.featureImage}>
                  {feature.video ? (
                    <LazyVideo
                      src={feature.video}
                      className={styles.videoContainer}
                      videoClassName={styles.videoElement}
                      autoPlay
                      loop
                      muted
                      playsInline
                      rootMargin="200px 0px"
                      onClick={() => handleVideoClick(feature.video, index)}
                      videoRef={(el) => {
                        videoRefs.current[`video-${index}`] = el;
                      }}
                    >
                      <div className={styles.videoOverlay}>
                        <div className={styles.hoverText}>
                          {CONTENT.videoHoverText}
                        </div>
                      </div>
                    </LazyVideo>
                  ) : (
                    <div className={globalStyles.imagePlaceholder} />
                  )}
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 可视化开发模块部分 - 2行卡片自动滚动（随机排序，单向滚动） */}
        <div className={styles.modulesWrapper}>
          <div className={styles.developmentModules}>
            <div className={styles.modulesGrid}>
              {[0, 1].map((rowIndex) => {
                const itemsPerRow = Math.ceil(shuffledModules.length / 2);
                const startIndex = rowIndex * itemsPerRow;
                const endIndex = startIndex + itemsPerRow;
                const rowItems = shuffledModules.slice(startIndex, endIndex);
                
                return (
                  <div key={rowIndex} className={styles.modulesRow}>
                    {rowItems.map((module, index) => (
                      <ModuleCard key={`row${rowIndex}-${index}`} module={module} />
                    ))}
                    {/* 重复当前行卡片，实现无缝循环 */}
                    {rowItems.map((module, index) => (
                      <ModuleCard key={`row${rowIndex}-repeat-${index}`} module={module} />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 脚注 - 放在滚动区下方 */}
          <div className={styles.modulesFooter}>
            <p className={styles.modulesFootnote}>
              {CONTENT.modulesFootnotePrefix}
              <a 
                href={CONTENT.modulesFootnoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modulesFootnoteLink}
              >
                {CONTENT.modulesFootnoteLinkText}
              </a>
              {CONTENT.modulesFootnoteSuffix}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IDESection;