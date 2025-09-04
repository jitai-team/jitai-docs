import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import { 
  TABS, 
  PRICING_PLANS, 
  COMPARISON_FEATURES, 
  PAGE_CONTENT, 
  TABLE_HEADERS 
} from './constant';

const PricingSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [activeTab, setActiveTab] = useState<'subscription' | 'buyout'>('subscription');

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
          <h1 className={styles.pageTitle}>{PAGE_CONTENT.title}</h1>
          <p className={styles.pageSubtitle}>
            {PAGE_CONTENT.subtitle}
          </p>
        </div>

        {/* 价格模式切换标签 */}
        <div className={`${styles.tabContainer} ${animateElements ? styles.tabAnimate : ''}`}>
          <div className={styles.tabGroup}>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                <span className={styles.tabText}>{tab.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 许可证方案卡片 */}
        <div className={`${styles.pricingCards} ${animateElements ? styles.cardsAnimate : ''}`}>
          {PRICING_PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`${styles.pricingCard} ${styles[plan.cardType]} ${plan.isRecommended ? styles.recommended : ''}`}
            >
              {plan.isRecommended && (
                <div className={styles.recommendedBadge}>推荐</div>
              )}
              <div className={styles.cardHeader}>
                {/* <div className={styles.cardIcon}>{plan.icon}</div> */}
                <h3 className={styles.cardTitle}>{plan.title}</h3>
                <p className={styles.cardSubtitle}>{plan.subtitle}</p>
              </div>
              <div className={styles.cardPrice}>
                <div className={styles.priceGroup}>
                  <div className={styles.price}>
                    <span className={styles.currency}>¥</span>
                    <span className={styles.amount}>
                      {activeTab === 'subscription' ? plan.subscriptionPrice : plan.buyoutPrice}
                    </span>
                    <span className={styles.period}>
                      {activeTab === 'subscription' ? '元/年' : '元/永久'}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.cardFeatures}>
                {plan.features.map((feature, index) => (
                  <div key={index} className={styles.featureItem}>{feature}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
<stripe-pricing-table pricing-table-id="prctbl_1S3SyaD4F6dqpTDMO8GCU9LR"
publishable-key="pk_test_51S3BpQD4F6dqpTDM1FEq1rwSYa8SubHVPFUN0bShSCtVGauknzz2WmyZwN2YtlWU5Vs5DXA7NrMcIKuG5dhL2tu800KihAsWPf">
</stripe-pricing-table> */}

        {/* 功能对比表格 */}
        {/* <div className={`${styles.comparisonSection} ${animateElements ? styles.tableAnimate : ''}`}>
          <h2 className={styles.comparisonTitle}>{PAGE_CONTENT.comparisonTitle}</h2>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {TABLE_HEADERS.map((header, index) => (
                    <th key={index} className={styles.tableHeader}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((feature, index) => (
                  <tr key={index}>
                    <td className={styles.featureCell}>{feature.name}</td>
                    <td className={styles.featureCell}>{feature.desktop}</td>
                    <td className={styles.featureCell}>{feature.basic}</td>
                    <td className={styles.featureCell}>{feature.standard}</td>
                    <td className={styles.featureCell}>{feature.professional}</td>
                    <td className={styles.featureCell}>{feature.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}

        {/* 特别说明 */}
        <div className={`${styles.specialNote} ${animateElements ? styles.noteAnimate : ''}`}>
          <div className={styles.noteIcon}>{PAGE_CONTENT.specialNote.icon}</div>
          <div className={styles.noteContent}>
            <h3 className={styles.noteTitle}>{PAGE_CONTENT.specialNote.title}</h3>
            <p className={styles.noteText}>
              {PAGE_CONTENT.specialNote.text.split('3个时长为3个月的桌面版许可证').map((part, index) => (
                index === 0 ? (
                  <span key={index}>{part}<strong>3个时长为3个月的桌面版许可证</strong></span>
                ) : (
                  <span key={index}>{part}</span>
                )
              ))}
            </p>
          </div>
        </div>

        {/* 联系我们按钮 */}
        <div className={`${styles.contactSection} ${animateElements ? styles.contactAnimate : ''}`}>
          <h2 className={styles.contactTitle}>{PAGE_CONTENT.contact.title}</h2>
          <p className={styles.contactSubtitle}>
            {PAGE_CONTENT.contact.subtitle}
          </p>
          <a href={PAGE_CONTENT.contact.email} className={styles.contactButton}>
            <span className={styles.buttonText}>{PAGE_CONTENT.contact.buttonText}</span>
            <span className={styles.buttonIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
