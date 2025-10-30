import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import globalStyles from '@site/src/pages/index.module.css';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';

interface ReferralHeroSectionProps {
  currentLocale?: string;
}

const ReferralHeroSection: React.FC<ReferralHeroSectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;
  
  const [isVisible, setIsVisible] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [isCopiedCode, setIsCopiedCode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // 从URL参数中获取邀请码
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code') || '';
      setInviteCode(code);
    }
  }, []);

  // 复制邀请码
  const handleCopyCode = async () => {
    if (!inviteCode) return;
    
    try {
      await navigator.clipboard.writeText(inviteCode);
      setIsCopiedCode(true);
      setTimeout(() => {
        setIsCopiedCode(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className={`${styles.heroSection} ${isVisible ? styles.fadeIn : ''}`}>
      <div className={`${globalStyles.sectionContent} ${styles.sectionContent}`}>
        {/* 页面标题 */}
        <div className={styles.pageHeader}>
          <div className={styles.giftIcon}>🎁</div>
          <h1 className={styles.pageTitle}>{CONTENT.title}</h1>
          <p className={styles.pageDescription}>{CONTENT.description}</p>
        </div>

        {/* 邀请码区域 */}
        {inviteCode ? (
          <div className={styles.inviteContainer}>
            {/* 邀请码显示 */}
            <div className={styles.inviteBox}>
              <label className={styles.inviteLabel}>{CONTENT.inviteCodeLabel}</label>
              <div className={styles.inputRow}>
                <div className={styles.codeDisplay}>{inviteCode}</div>
                <button 
                  className={`${styles.copyButton} ${isCopiedCode ? styles.copied : ''}`}
                  onClick={handleCopyCode}
                >
                  {isCopiedCode ? CONTENT.copiedButton : CONTENT.copyCodeButton}
                </button>
              </div>
            </div>

            {/* 奖励说明 */}
            <div className={styles.rewardNote}>
              {CONTENT.rewardNote}
            </div>
          </div>
        ) : (
          <div className={styles.noCodeContainer}>
            <p className={styles.noCodeDesc}>{CONTENT.noInviteCodeDesc}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReferralHeroSection;

