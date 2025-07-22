import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ScrollAnimation from '../ScrollAnimation';
import { CONTENT } from './constant';

const IDESection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [hasReachedTop, setHasReachedTop] = useState(false);
  const [hasCompletedSequence, setHasCompletedSequence] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const coreFeaturesRef = useRef<HTMLDivElement>(null); // 新增：coreFeatures的ref
  const tabsRef = useRef<HTMLDivElement>(null);
  const virtualScrollRef = useRef(0);
  const lockedScrollPosition = useRef(0);
  const isUnlocking = useRef(false);

  // 解锁滚动的统一函数
  const unlockScroll = useCallback(() => {
    if (isUnlocking.current) return;
    isUnlocking.current = true;

    // 立即恢复body样式
    document.body.style.overflow = '';

    // 更新状态
    setIsScrollLocked(false);
    setHasReachedTop(false);
    setHasCompletedSequence(true); // 标记已完成序列
    virtualScrollRef.current = 0;

    // 延迟重置解锁标志
    setTimeout(() => {
      isUnlocking.current = false;
    }, 100);
  }, []);

  // 点击切换到指定tab
  const switchToTab = (tabIndex: number) => {
    // 判断切换方向
    if (tabIndex > activeTab) {
      setDirection('forward');
    } else if (tabIndex < activeTab) {
      setDirection('backward');
    }
    setActiveTab(tabIndex);

    // 如果点击切换到第3个tab，解锁滚动
    if (tabIndex === 2 && isScrollLocked) {
      unlockScroll();
    }
  };

  // 处理虚拟滚动（在锁定状态下模拟滚动进度）
  const handleVirtualScroll = useCallback((e: WheelEvent) => {
    if (!isScrollLocked || isUnlocking.current || hasCompletedSequence) return;

    e.preventDefault();
    e.stopPropagation();

    // 累积虚拟滚动距离
    virtualScrollRef.current += e.deltaY * 0.5;

    // 限制虚拟滚动范围
    const maxVirtualScroll = window.innerHeight * 1.0;
    virtualScrollRef.current = Math.max(0, Math.min(virtualScrollRef.current, maxVirtualScroll));

    // 根据虚拟滚动进度计算tab索引
    const progress = virtualScrollRef.current / maxVirtualScroll;
    let newTabIndex = 0;

    if (progress >= 0.66) {
      newTabIndex = 2;
    } else if (progress >= 0.33) {
      newTabIndex = 1;
    }

    // 更新activeTab
    if (newTabIndex !== activeTab) {
      setDirection(newTabIndex > activeTab ? 'forward' : 'backward');
      setActiveTab(newTabIndex);

      // 如果到达第3个tab，解锁滚动
      if (newTabIndex === 2) {
        unlockScroll();
      }
    }
  }, [isScrollLocked, activeTab, unlockScroll, hasCompletedSequence]);

  // 阻止默认滚动行为
  const preventDefaultScroll = useCallback((e: Event) => {
    if (isScrollLocked && !isUnlocking.current && !hasCompletedSequence) {
      e.preventDefault();
      e.stopPropagation();
      // 强制保持在锁定位置
      window.scrollTo(0, lockedScrollPosition.current);
      return false;
    }
  }, [isScrollLocked, hasCompletedSequence]);

  // 滚动监听，检测section位置
  const handleScroll = useCallback(() => {
    if (isScrollLocked || isUnlocking.current || hasCompletedSequence) return;

    if (!sectionRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();

    // 检查section顶部是否到达视口顶部
    if (sectionRect.top <= 0 && !hasReachedTop) {
      setHasReachedTop(true);
      setIsScrollLocked(true);
      setActiveTab(0);
      virtualScrollRef.current = 0;
      lockedScrollPosition.current = window.pageYOffset;
    }

    // 如果section完全离开视口，重置所有状态（为下次进入做准备）
    if (sectionRect.bottom < -window.innerHeight && (hasReachedTop || hasCompletedSequence)) {
      setHasReachedTop(false);
      setIsScrollLocked(false);
      setHasCompletedSequence(false);
      setActiveTab(0);
      virtualScrollRef.current = 0;
      document.body.style.overflow = '';
    }
  }, [isScrollLocked, hasReachedTop, hasCompletedSequence]);

  // 管理滚动锁定事件监听器
  useEffect(() => {
    if (isScrollLocked && !isUnlocking.current && !hasCompletedSequence) {
      // 记录锁定时的滚动位置
      lockedScrollPosition.current = window.pageYOffset;

      // 添加事件监听器
      const wheelOptions = { passive: false };
      const scrollOptions = { passive: false };

      window.addEventListener('wheel', handleVirtualScroll, wheelOptions);
      window.addEventListener('scroll', preventDefaultScroll, scrollOptions);
      window.addEventListener('touchmove', preventDefaultScroll, { passive: false });

      // 设置body样式
      document.body.style.overflow = 'hidden';

      return () => {
        // 清理事件监听器
        window.removeEventListener('wheel', handleVirtualScroll);
        window.removeEventListener('scroll', preventDefaultScroll);
        window.removeEventListener('touchmove', preventDefaultScroll);
      };
    }
  }, [isScrollLocked, handleVirtualScroll, preventDefaultScroll, hasCompletedSequence]);

  // 全局滚动监听器（独立于锁定状态）
  useEffect(() => {
    // 节流处理
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

    // 始终添加滚动监听器
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      // 确保组件卸载时恢复滚动
      document.body.style.overflow = '';
      isUnlocking.current = false;
    };
  }, []);

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
            <div ref={coreFeaturesRef} className={styles.coreFeatures}> {/* 添加ref */}
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
                  {/* 占位元素，用于撑开容器高度 */}
                  <div className={styles.tabPanel} style={{ position: 'relative', opacity: 0, pointerEvents: 'none' }}>
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
                        </div>
                      </div>
                      <div className={styles.tabText}>
                        <p className={styles.tabDescription}>{CONTENT.coreFeatures[0].description}</p>
                      </div>
                    </div>
                  </div>

                  {CONTENT.coreFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className={`${styles.tabPanel} ${activeTab === index ? styles.activePanel : ''} ${direction === 'forward' ? styles.forwardDirection : styles.backwardDirection}`}
                      style={{
                        transitionDelay: activeTab === index ? '0ms' : '0ms',
                        transitionDuration: '0.5s',
                        transitionTimingFunction: 'ease'
                      }}
                    >
                      <div className={styles.tabContent}>
                        <div className={styles.tabImage}>
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