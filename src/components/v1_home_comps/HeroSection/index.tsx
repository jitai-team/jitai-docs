import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import globalStyles from '../../../pages/v1.module.css';
import CONTENT_ZH from './constant-zh';
import CONTENT_EN from './constant-en';
import { addUTMToUrl } from '../../../utils/utm';

// 打字机效果组件
const TypewriterText: React.FC<{ text: string; isVisible: boolean; speed?: number; repeat?: boolean }> = ({
  text,
  isVisible,
  speed = 100,
  repeat = false
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      setCurrentIndex(0);
      setIsTyping(false);
      setShowCursor(false);
      return;
    }

    if (currentIndex < text.length) {
      setIsTyping(true);
      setShowCursor(true);
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
      // 如果启用重复播放，在完成后延迟重新开始
      if (repeat) {
        const resetTimer = setTimeout(() => {
          setDisplayText('');
          setCurrentIndex(0);
        }, 3000); // 等待3秒后重新开始
        return () => clearTimeout(resetTimer);
      } else {
        // 如果不重复，等待一段时间后隐藏光标
        const hideCursorTimer = setTimeout(() => {
          setShowCursor(false);
        }, 3000); // 等待3秒后隐藏光标
        return () => clearTimeout(hideCursorTimer);
      }
    }
  }, [currentIndex, text, isVisible, speed, repeat]);

  return (
    <span className={styles.typewriterText}>
      {displayText || ' '}
      <span className={styles.cursorContainer}>
        {showCursor && (
          <span className={`${styles.cursor} ${isTyping ? styles.typing : ''}`}>|</span>
        )}
      </span>
    </span>
  );
};

const HeroSection: React.FC<{ currentLocale?: string }> = ({ currentLocale }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const content = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 延迟显示，让页面先加载完成
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // 延迟启动打字机效果
      setTimeout(() => {
        setShowTypewriter(true);
      }, 500);
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

      <div className={globalStyles.sectionContent}>
        <div className={styles.heroLeft}>
          {/* 主标题区域 */}
          <div className={styles.titleSection}>
            <div className={`${styles.titleBadge} ${styles.hideOnMobile}`}>
              <span className={styles.badgeText}>NEXT-GEN</span>
            </div>
            <h1 className={`${styles.heroTitle} ${animateElements ? styles.titleAnimate : ''}`}>
              {content.mainTitle}
            </h1>
          </div>

          {/* 副标题区域 */}
          <div className={styles.subtitleSection}>
            <div className={`${styles.subtitleCard} ${animateElements ? styles.cardAnimate1 : ''}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3349f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.iconSvg}>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h2 className={styles.subtitleTitle}>{content.subTitle1}</h2>
              </div>
              <p className={styles.subtitleText}>
                {content.subDesc1}
              </p>
            </div>

            <div className={`${styles.subtitleCard} ${animateElements ? styles.cardAnimate2 : ''}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#bb4baf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.iconSvg}>
                    {/* 简化的编排式开发技术图标 */}
                    <circle cx="12" cy="12" r="9"></circle>
                    <circle cx="12" cy="12" r="3"></circle>
                    <line x1="3" y1="12" x2="9" y2="12"></line>
                    <line x1="15" y1="12" x2="21" y2="12"></line>
                    <line x1="12" y1="3" x2="12" y2="9"></line>
                    <line x1="12" y1="15" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h2 className={styles.subtitleTitle}>{content.subTitle2}</h2>
              </div>
              <p className={styles.subtitleText}>
                {content.subDesc2}
              </p>
            </div>
          </div>

          {/* 行动按钮区域 */}
          <div className={`${styles.heroButtons} ${animateElements ? styles.buttonsAnimate : ''}`}>
            <a className={styles.primaryButton} href={isMobile ? "./docs/tutorial" : addUTMToUrl("https://demo.jit.pro")} target="_blank">
              <span className={styles.buttonText}>
                {isMobile ? content.buttonGetStart : content.buttonDemo}
              </span>
              <span className={styles.buttonIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </span>
            </a>
            <a className={`${styles.secondaryButton}`} href="./download" >
              <span className={styles.buttonText}>
                {content.buttonDownload}
              </span>
              <span className={styles.buttonIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
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
