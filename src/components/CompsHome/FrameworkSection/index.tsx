import React, { useMemo } from 'react';
import styles from './styles.module.css';
import globalStyles from '../../../pages/index.module.css';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';

// Fisher-Yates 洗牌算法
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface FrameworkSectionProps {
  currentLocale?: string;
}

const FrameworkSection: React.FC<FrameworkSectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

  // 获取所有集成项并随机排序（每次页面加载时随机一次）
  const allItems = useMemo(() => shuffleArray(CONTENT.integrations), [CONTENT.integrations]);

  return (
    <section
      id="section-framework"
      className={`${styles.frameworkSection} ${globalStyles.gradientBackground}`}
      style={{
        '--section-color': CONTENT.color,
        '--card-color': CONTENT.color,
      } as React.CSSProperties}
    >
      <div className={globalStyles.sectionContent}>
        {/* Frameworks Section */}
        <div className={styles.headerSection}>
          <h2 className={globalStyles.sectionTitle}>{CONTENT.title}</h2>
          <p className={styles.sectionSubtitle}>
            {CONTENT.subtitle}
          </p>
        </div>

        <div className={styles.frameworksGrid}>
          {CONTENT.frameworks.map((framework, index) => (
            <a
              href={`/docs/reference/framework/${framework.name}`}
              target="_blank"
              key={index}
              className={`${globalStyles.baseCard} ${styles.frameworkCard} ${styles.frameworkLink} animatedChild`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <span className={styles.iconEmoji}>{framework.icon}</span>
                </div>
                <h3 className={styles.frameworkName}>{framework.name}</h3>
                <div className={styles.linkIndicator}>
                  <span>{CONTENT.learnMore}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <p className={styles.frameworkDescription}>{framework.description}</p>
            </a>
          ))}
        </div>

        {/* Integrations Section - 滚动卡片效果 */}
        <div className={styles.integrationsWrapper}>
          <div className={styles.integrationsSection}>
            <div className={styles.integrationsGrid}>
              {/* 将集成项分成4行 */}
              {[0, 1, 2, 3].map((rowIndex) => {
                const itemsPerRow = Math.ceil(allItems.length / 4);
                const startIndex = rowIndex * itemsPerRow;
                const endIndex = startIndex + itemsPerRow;
                const rowItems = allItems.slice(startIndex, endIndex);
                
                return (
                  <div key={rowIndex} className={styles.integrationsRow}>
                    {rowItems.map((item, index) => {
                      const variant = (item as any).variant || 'icon';
                      const assetSize = (item as any).assetSize || 'medium';
                      const textSize = (item as any).textSize || 'large';
                      
                      // 根据 variant 选择不同的样式类
                      const assetClass = variant === 'logo' 
                        ? styles.integrationLogo 
                        : styles.integrationIcon;
                      const assetSizeClass = styles[`assetSize${assetSize.charAt(0).toUpperCase() + assetSize.slice(1)}`] || '';
                      const textSizeClass = styles[`textSize${textSize.charAt(0).toUpperCase() + textSize.slice(1)}`] || '';
                      
                      return (
                        <div key={`${rowIndex}-${index}`} className={styles.integrationCard}>
                          {(item as any).asset && (
                            <img
                              src={(item as any).asset}
                              alt={item.name}
                              className={`${assetClass} ${assetSizeClass}`}
                            />
                          )}
                          {variant === 'icon' && (
                            <span className={`${styles.integrationName} ${textSizeClass}`}>{item.name}</span>
                          )}
                        </div>
                      );
                    })}
                    {/* 重复当前行卡片，实现无缝循环滚动 */}
                    {rowItems.map((item, index) => {
                      const variant = (item as any).variant || 'icon';
                      const assetSize = (item as any).assetSize || 'medium';
                      const textSize = (item as any).textSize || 'large';
                      
                      const assetClass = variant === 'logo' 
                        ? styles.integrationLogo 
                        : styles.integrationIcon;
                      const assetSizeClass = styles[`assetSize${assetSize.charAt(0).toUpperCase() + assetSize.slice(1)}`] || '';
                      const textSizeClass = styles[`textSize${textSize.charAt(0).toUpperCase() + textSize.slice(1)}`] || '';
                      
                      return (
                        <div key={`${rowIndex}-${index}-repeat`} className={styles.integrationCard}>
                          {(item as any).asset && (
                            <img
                              src={(item as any).asset}
                              alt={item.name}
                              className={`${assetClass} ${assetSizeClass}`}
                            />
                          )}
                          {variant === 'icon' && (
                            <span className={`${styles.integrationName} ${textSizeClass}`}>{item.name}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 脚注 - 放在滚动区下方 */}
          <div className={styles.integrationsFooter}>
            <p className={styles.integrationsFootnote}>
              {CONTENT.integrationsSubtitlePrefix}
              <a 
                href={CONTENT.integrationsSubtitleLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.integrationsFootnoteLink}
              >
                {CONTENT.integrationsSubtitleLinkText}
              </a>
              {CONTENT.integrationsSubtitleSuffix}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameworkSection;
