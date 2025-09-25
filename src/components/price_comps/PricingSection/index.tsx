import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import globalStyles from '../../../pages/index.module.css';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';

interface PricingSectionProps {
  currentLocale?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

  const [isVisible, setIsVisible] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [activeTab, setActiveTab] = useState<'yearly' | 'monthly' | 'buyout'>('yearly');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setAnimateElements(true);
      }, 300);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="pricing-section" className={`${styles.pricing} ${isVisible ? styles.fadeIn : ''}`}>

      <div className={`${globalStyles.sectionContent} ${styles.sectionContent}`}>
        {/* 页面标题 */}
        <div className={`${styles.pageHeader} ${animateElements ? styles.headerAnimate : ''}`}>
          <h1 className={styles.pageTitle}>{CONTENT.title}</h1>
          <p className={styles.pageSubtitle}>
            {CONTENT.subtitle}
          </p>
        </div>

        {/* 价格模式切换标签 */}
        <div className={`${styles.tabContainer} ${animateElements ? styles.tabAnimate : ''}`}>
          <div className={styles.tabGroup}>
            <button
                key='monthly'
                className={`${styles.tab} ${activeTab === 'monthly' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('monthly')}
              >
                <span className={styles.tabIcon}>📅</span>
                <span className={styles.tabText}>{CONTENT.monthly}</span>
            </button>
            <button
                key='yearly'
                className={`${styles.tab} ${activeTab === 'yearly' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('yearly')}
              >
                <span className={styles.tabIcon}>📅</span>
                <span className={styles.tabText}>{CONTENT.yearly}</span>
            </button>
            <button
                key='buyout'
                className={`${styles.tab} ${activeTab === 'buyout' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('buyout')}
              >
                <span className={styles.tabIcon}>🏷️</span>
                <span className={styles.tabText}>{CONTENT.buyout}</span>
            </button>
          </div>
        </div>

        {/* 许可证方案卡片 */}
        <div className={`${styles.pricingCards} ${animateElements ? styles.cardsAnimate : ''}`}>
          {CONTENT.pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`${styles.pricingCard} ${styles[plan.cardType]} ${plan.isRecommended ? styles.recommended : ''}`}
            >
              {plan.isRecommended && (
                <div className={styles.recommendedBadge}>{CONTENT.recommendedBadge}</div>
              )}
              <div className={styles.cardHeader}>
                {/* <div className={styles.cardIcon}>{plan.icon}</div> */}
                <h3 className={styles.cardTitle}>{plan.title}</h3>
                <p className={styles.cardSubtitle}>{plan.subtitle}</p>
              </div>
              <div className={styles.cardPrice}>
                <div className={styles.priceGroup}>
                  <div className={styles.price}>
                    {/* <span className={styles.currency}>¥</span> */}
                    <span className={styles.amount}>{plan.id === 'enterprise' ? '' : CONTENT.moneyUnit}
                     {plan[activeTab+'Price']}
                    </span>
                    <span className={styles.period}>
                      {plan.id === 'enterprise' ? '' : CONTENT.priceUnit[activeTab]}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.cardAction}>
                <button className={styles.orderButton}>
                  {plan.id === 'enterprise' ? CONTENT.contactSales : (activeTab === 'buyout' ? CONTENT.pay : CONTENT.subscribe)}
                </button>
              </div>
              <div className={styles.cardFeatures}>
                <div className={styles.packageInfo}>{CONTENT.includes}</div>
                {plan.features.map((feature, index) => (
                  <div key={index} className={styles.featureItem}>{feature}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 特别说明 */}
        <div className={`${styles.specialNote} ${animateElements ? styles.noteAnimate : ''}`}>
          <div className={styles.noteIcon}>🎁</div>
          <div className={styles.noteContent}>
            <h3 className={styles.noteTitle}>{CONTENT.specialOffer}</h3>
            <p className={styles.noteText}>
              {CONTENT.specialOfferDescriptions[0]}
              <strong>{CONTENT.specialOfferDescriptions[1]}</strong>
              {CONTENT.specialOfferDescriptions[2]}
            </p>
            {/* <a className={styles.downloadButton} href="./docs/tutorial/download-installation" target="_blank">
              <span className={styles.buttonText}>立即下载</span>
              <span className={styles.buttonIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </span>
            </a> */}
          </div>
        </div>


      </div>
    </section>
  );
};

export default PricingSection;
