import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';

interface DownloadSectionProps {
  currentLocale?: string;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

  const [copySuccess, setCopySuccess] = useState(false);
  // 中文版默认使用中国大陆镜像，英文版默认使用全球镜像
  const [isChinaMirror, setIsChinaMirror] = useState(currentLocale === 'zh');
  const [isMobile, setIsMobile] = useState(false);

  // 检测移动端
  useEffect(() => {
      const checkMobile = () => {
          setIsMobile(window.innerWidth <= 768);
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => {
          window.removeEventListener("resize", checkMobile);
      };
  }, []);

  const handleCopy = async () => {
    try {
      const command = isChinaMirror ? CONTENT.server.docker.chinaCommand : CONTENT.server.docker.globalCommand;
      await navigator.clipboard.writeText(command);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const handleMacDownload = (url: string) => {
    // 先打开安全提示页面
    window.open(url);
    // 延迟打开下载链接，避免浏览器拦截
    setTimeout(() => {
      window.location.href = CONTENT.desktop.mac.macSecurityUrl;
    }, 100);
  };

  const renderMobileContent = () => (
    <div className={styles.mobileTopBanner}>
      <div className={styles.mobileTopBannerContent}>
        <h2 className={styles.mobileTopBannerTitle}>{CONTENT.mobile?.title}</h2>
        <p className={styles.mobileTopBannerDescription}>{CONTENT.mobile?.description}</p>
      </div>
    </div>
  );

  const renderDesktopContent = () => (
    <>
      {/* 桌面版卡片 - 并列显示 */}
      <div className={styles.desktopCards}>
        {/* Windows 版本 */}
        <div className={styles.versionCard}>
          <div className={styles.versionIcon}>
            <svg viewBox="0 0 21 21" fill="currentColor" className={`${styles.iconSvg} ${styles.iconWindows}`}>
              <path d="M0 0h10v10H0V0zm11 0h10v10H11V0zM0 11h10v10H0V11zm11 0h10v10H11V11z"/>
            </svg>
          </div>
          <div className={styles.versionHeader}>
            <h2 className={styles.versionTitle}>{CONTENT.desktop.windows.title}</h2>
            <p className={styles.versionDescription}>{CONTENT.desktop.windows.description}</p>
            <div className={styles.downloadActions}>
              <a 
                href={CONTENT.desktop.windows.downloadUrl} 
                className={`${styles.downloadButton} analytics-downloadWindows`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.buttonText}>{CONTENT.desktop.windows.downloadText}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mac 版本 */}
        <div className={styles.versionCard}>
          <div className={styles.versionIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor" className={`${styles.iconSvg} ${styles.iconMac}`}>
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2.026-.152-3.662 1.183-4.6 1.183zm3.679-3.675c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
            </svg>
          </div>
          <div className={styles.versionHeader}>
            <h2 className={styles.versionTitle}>{CONTENT.desktop.mac.title}</h2>
            <p className={styles.versionDescription}>{CONTENT.desktop.mac.description}</p>
            <div className={styles.downloadActions}>
              <button 
                onClick={() => handleMacDownload(CONTENT.desktop.mac.appleDownloadUrl)}
                className={`${styles.downloadButton} analytics-downloadMac analytics-downloadMacApple`}
              >
                <span className={styles.buttonText}>{CONTENT.desktop.mac.appleDownloadText}</span>
              </button>
              <button 
                onClick={() => handleMacDownload(CONTENT.desktop.mac.intelDownloadUrl)}
                className={`${styles.downloadButtonSecondary}  analytics-downloadMac analytics-downloadMacIntel`}
              >
                <span className={styles.buttonText}>{CONTENT.desktop.mac.intelDownloadText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Docker 版本 - 独立一行 */}
      <div className={`${styles.versionCard} ${styles.dockerCard}`}>
        <div className={styles.versionIcon}>
          <svg viewBox="0 0 24 24" fill="currentColor" className={`${styles.iconSvg} ${styles.iconDocker}`}>
            <path d="M3 7h2v2H3V7zm3 0h2v2H6V7zm3 0h2v2H9V7zm-6 3h2v2H3v-2zm3 0h2v2H6v-2zm3 0h2v2H9v-2zm3 0h2v2h-2v-2zm-6-6h2v2H6V4zm3 0h2v2H9V4zm3 0h2v2h-2V4zm3 3h2v2h-2V7zm-3-3h2v2h-2V4zm3 0h2v2h-2V4zm5 7c0 5.52-4.48 10-10 10S2 16.52 2 11h2c0 4.41 3.59 8 8 8s8-3.59 8-8h2z"/>
          </svg>
        </div>
        <div className={styles.versionHeader}>
          <h2 className={styles.versionTitle}>{CONTENT.server.docker.title}</h2>
          <p className={styles.versionDescription}>{CONTENT.server.docker.description}</p>
          
          {/* 代码块容器 */}
          <div className={styles.codeContainer}>
            {/* 代码块 */}
            <div className={styles.codeBlock}>
              {/* 代码块头部 - 分段控制器在左上角 */}
              <div className={styles.codeHeader}>
                <div className={styles.segmentedControl}>
                  <button 
                    className={`${styles.segmentButton} ${!isChinaMirror ? styles.segmentActive : ''}`}
                    onClick={() => setIsChinaMirror(false)}
                  >
                    {CONTENT.server.docker.globalSegment}
                  </button>
                  <button 
                    className={`${styles.segmentButton} ${isChinaMirror ? styles.segmentActive : ''}`}
                    onClick={() => setIsChinaMirror(true)}
                  >
                    {CONTENT.server.docker.chinaSegment}
                  </button>
                </div>
              </div>
              
              {/* 代码内容 */}
              <div className={styles.codeContent}>
                <span className={styles.codePrompt}>{'>'}</span>
                <div className={styles.codeText}>
                  <code>{isChinaMirror ? CONTENT.server.docker.chinaCommand : CONTENT.server.docker.globalCommand}</code>
                </div>
              </div>
            </div>
            
            {/* 复制按钮 - 位于代码块外面右下角 */}
            <div className={styles.codeActions}>
              <button 
                className={`${styles.copyButton} analytics-copyDocker`}
                onClick={handleCopy}
              >
                {copySuccess ? CONTENT.server.docker.copySuccess : CONTENT.server.docker.copyText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section id="download-section" className={`${styles.download}`}>
      {isMobile && renderMobileContent()}
      <div className={`${globalStyles.sectionContent} ${styles.sectionContent}`}>
        {/* 页面标题 */}
        <div className={`${styles.pageHeader}`}>
          <h1 className={styles.pageTitle}>{CONTENT.title}</h1>
          <p className={styles.pageSubtitle}>
            {CONTENT.subtitle}
          </p>
        </div>

        {/* 下载内容区域 */}
        <div className={`${styles.downloadContent}`}>
          {renderDesktopContent()}
        </div>

        {/* 帮助链接 */}
        <div className={styles.helpLink}>
          <a href={CONTENT.helpUrl} target="_blank" rel="noopener noreferrer">
            {CONTENT.helpText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
