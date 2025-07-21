import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ScrollAnimation from '../ScrollAnimation';
import { CONTENT } from './constant';

const IDESection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

    // 点击切换到指定tab
  const switchToTab = (tabIndex: number) => {
    // 判断切换方向
    if (tabIndex > activeTab) {
      setDirection('forward');
    } else if (tabIndex < activeTab) {
      setDirection('backward');
    }
    setActiveTab(tabIndex);
  };

        // 滚动监听，自动切换tab
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 当section进入视口时开始监听
      if (sectionRect.top <= windowHeight && sectionRect.bottom >= 0) {
        // 计算section在视口中的位置比例
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;

        // 计算滚动进度：0表示section顶部刚进入视口，1表示section底部即将离开视口
        const scrollProgress = Math.max(0, Math.min(1,
          (windowHeight - sectionTop) / (windowHeight + sectionHeight)
        ));

        // 根据滚动进度计算当前应该显示的tab
        // 确保能滚动到最后一个tab
        const newTabIndex = Math.min(
          Math.floor(scrollProgress * CONTENT.coreFeatures.length),
          CONTENT.coreFeatures.length - 1
        );

        // 确保最后一个tab也能被触发
        if (scrollProgress >= 0.9) {
          if (newTabIndex !== activeTab) {
            setDirection(newTabIndex > activeTab ? 'forward' : 'backward');
            setActiveTab(CONTENT.coreFeatures.length - 1);
          }
        } else if (newTabIndex !== activeTab && newTabIndex >= 0 && newTabIndex < CONTENT.coreFeatures.length) {
          setDirection(newTabIndex > activeTab ? 'forward' : 'backward');
          setActiveTab(newTabIndex);
        }
      }
    };

    // 使用节流优化滚动性能
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [activeTab]);

  return (
    <ScrollAnimation animationType="fadeInUp" duration={500}>
      <section
        ref={sectionRef}
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

          {/* 核心特性部分 - Tabs展示 */}
          <ScrollAnimation animationType="fadeInUp" delay={200}>
            <div className={styles.coreFeatures}>
              <div className={styles.tabsContainer}>
                {/* Tabs导航 */}
                <div className={styles.tabsNav}>
                  {CONTENT.coreFeatures.map((feature, index) => (
                    <button
                      key={index}
                      className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ''}`}
                      onClick={() => switchToTab(index)}
                    >
                      {feature.title}

                    </button>
                  ))}
                </div>



                {/* Tabs内容 */}
                <div ref={tabsRef} className={styles.tabsContent}>
                  {CONTENT.coreFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className={`${styles.tabPanel} ${activeTab === index ? styles.activePanel : ''} ${direction === 'forward' ? styles.forwardDirection : styles.backwardDirection}`}
                    >
                      <div className={styles.tabContent}>
                        <div className={styles.tabImage}>
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
                        <div className={styles.tabText}>
                          <p className={styles.tabDescription}>{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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