import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const CONTENT = {
  mainTitle: '面向AI的下一代企业级应用开发技术',
  subTitle1: '全栈一体化的AI开发与运维平台​',
  subDesc1: '覆盖“开发->调测->发布->部署->更新”全生命周期的一站式平台，助力开发者高效构建"AI助理软件"和"管理软件"原生一体的生产级企业AI应用，加速企业AI应用的规模化。',
  subTitle2: '解释型、编排式的生产级AI开发范式',
  subDesc2: '开创性的解释型应用架构、应用协议和应用运行平台，带来解释型、可编排的AI上下文环境，以及全新的应用开发新范式、新框架、新工具，引领企业级应用开发迈入AI时代。'
};

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);

  // 延迟显示，让页面先加载完成
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // 延迟启动元素动画
      setTimeout(() => {
        setAnimateElements(true);
      }, 300);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="section-0" className={`${styles.hero} ${isVisible ? styles.fadeIn : ''}`}>
      {/* 背景装饰元素 */}
      <div className={styles.backgroundElements}>
        <div className={styles.floatingElement1}></div>
        <div className={styles.floatingElement2}></div>
        <div className={styles.floatingElement3}></div>
        <div className={styles.gradientOrb}></div>
      </div>

      {/* 品牌背景 */}
      {/* <div className={styles.brandBg}>
        <div className={styles.taglineBlock}>
          <div className={styles.taglineLine1}>
            <span className={styles.boldInitial}>J</span>UST
            <span style={{margin: '0 0.5vw'}}></span>
            <span className={styles.boldInitial}>I</span>N
            <span style={{margin: '0 0.5vw'}}></span>
            <span className={styles.boldInitial}>T</span>IME
          </div>
          <div className={styles.taglineLine2}>
            FOR <span className={styles.boldInitial}>A</span><span className={styles.boldAI}>I</span> APP
          </div>
        </div>
      </div> */}

      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          {/* 主标题区域 */}
          <div className={styles.titleSection}>
            <div className={styles.titleBadge}>
              <span className={styles.badgeText}>NEXT-GEN</span>
            </div>
            <h1 className={`${styles.heroTitle} ${animateElements ? styles.titleAnimate : ''}`}>
              {CONTENT.mainTitle}
            </h1>
          </div>

          {/* 副标题区域 */}
          <div className={styles.subtitleSection}>
            <div className={`${styles.subtitleCard} ${animateElements ? styles.cardAnimate1 : ''}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2449fe" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h2 className={styles.subtitleTitle}>{CONTENT.subTitle1}</h2>
              </div>
              <p className={styles.subtitleText}>
                {CONTENT.subDesc1}
              </p>
            </div>

            <div className={`${styles.subtitleCard} ${animateElements ? styles.cardAnimate2 : ''}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2449fe" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
                <h2 className={styles.subtitleTitle}>{CONTENT.subTitle2}</h2>
              </div>
              <p className={styles.subtitleText}>
                {CONTENT.subDesc2}
              </p>
            </div>
          </div>

          {/* 行动按钮区域 */}
          <div className={`${styles.heroButtons} ${animateElements ? styles.buttonsAnimate : ''}`}>
            <a className={styles.primaryButton} href="./docs/tutorial/00快速上手/01下载安装" target="_blank">
              <span className={styles.buttonText}>立即下载</span>
              <span className={styles.buttonIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </span>
            </a>
            <a className={styles.secondaryButton} href="https://demo.jit.pro" target="_blank">
              <span className={styles.buttonText}>在线体验</span>
              <span className={styles.buttonIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;