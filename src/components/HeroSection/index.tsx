import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const CONTENT = {
  heroTitles: [
    {
      content: '为 AI 而生的<br/> 下一代应用开发技术体系'
    },
    {
      content: '解释型、编排式的 <br/> 生产级AI应用开发平台'
    }
  ]
};

const HeroSection: React.FC = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 延迟显示，让页面先加载完成
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // 打字机效果
  useEffect(() => {
    const startTyping = () => {
      const currentTitle = CONTENT.heroTitles[currentTitleIndex].content;
      const cleanText = currentTitle.replace(/<br\s*\/?>/gi, '\n');
      const textArray = cleanText.split('');

      setIsTyping(true);
      setDisplayedText('');
      setIsFading(false);

      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < textArray.length) {
          const nextChar = textArray[currentIndex];
          setDisplayedText(prev => prev + nextChar);
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);

          // 显示完成后等待一段时间再开始淡出
          setTimeout(() => {
            setIsFading(true);

            // 淡出完成后切换到下一个标题
            setTimeout(() => {
              setCurrentTitleIndex(prev => (prev + 1) % CONTENT.heroTitles.length);
              setIsFading(false); // 重置淡出状态
            }, 300); // 等待淡出动画完成
          }, 1000); // 增加显示时间到1秒
        }
      }, 100);

      return () => clearInterval(typeInterval);
    };

    // 立即开始打字
    const cleanup = startTyping();
    return cleanup;
  }, [currentTitleIndex]);

  return (
    <section id="section-0" className={`${styles.hero} ${isVisible ? styles.fadeIn : ''}`}>
      <div className={styles.brandBg}>
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
      </div>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          {/* <h1 className={styles.heroTitle}>JitAi 是 </h1> */}
          <h1 className={`${styles.heroTitle} ${isFading ? styles.fadeOut : ''}`}>
            {displayedText.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < displayedText.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
            {<span className={styles.cursor}>|</span>}
          </h1>
          <p className={styles.heroSubtitle}>
            开创性的解释型应用架构、应用协议和应用运行平台，颠覆性的编排式应用开发新范式、新框架、新工具，把企业级应用开发带入AI时代。
            <br />
            <br />
            帮助开发者快速构建与传统管理系统原生一体的生产级AI应用，实现"AI助理智件"和"传统管理软件"的无缝融合，加速企业AI应用的规模化。
          </p>
          <div className={styles.heroButtons}>
            <a className={styles.primaryButton} href="./docs/tutorial/00快速上手/01下载安装" target="_blank">立即下载</a>
            <a className={styles.secondaryButton} href="https://demo.jit.pro" target="_blank">在线体验</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;