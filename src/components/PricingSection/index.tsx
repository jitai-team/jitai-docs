import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import { 
  TABS, 
  PRICING_PLANS
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
          <h1 className={styles.pageTitle}>价格</h1>
          <p className={styles.pageSubtitle}>
            JitAi可部署在任意个人电脑或服务器上，按需购买对应终端规格的许可证即可。
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
                    {/* <span className={styles.currency}>¥</span> */}
                    <span className={styles.amount}>¥
                      {activeTab === 'subscription' ? plan.subscriptionPrice : plan.buyoutPrice}
                    </span>
                    <span className={styles.period}>
                      {activeTab === 'subscription' ? '/个/年' : '/个/永久'}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.cardAction}>
                <button className={styles.orderButton}>
                  {activeTab === 'subscription' ? '订阅' : '购买'}
                </button>
              </div>
              <div className={styles.cardFeatures}>
                <div className={styles.packageInfo}>这包括：</div>
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
            <h3 className={styles.noteTitle}>特别优惠</h3>
            <p className={styles.noteText}>
              每个开发组织注册即送<strong>3个桌面版许可证</strong>（时长均为3个月），让你充分体验JitAi的强大功能！
            </p>
            {/* <a className={styles.downloadButton} href="./docs/tutorial/下载安装" target="_blank">
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


        {/* 联系我们按钮 */}
        <div className={`${styles.contactSection} ${animateElements ? styles.contactAnimate : ''}`}>
          <h2 className={styles.contactTitle}>准备开始您的AI应用开发之旅？</h2>
          <p className={styles.contactSubtitle}>
            联系我们的销售团队，获取最适合您需求的许可证方案
          </p>
          <a href="mailto:sales@jit.pro" className={styles.contactButton}>
            <span className={styles.buttonText}>联系我们</span>
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
