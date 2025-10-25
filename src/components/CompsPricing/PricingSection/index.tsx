import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import globalStyles from '../../../pages/index.module.css';
import Modal from '../../Modal';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';
import { STRIPE_LINKS } from './constant-common';

interface PricingSectionProps {
  currentLocale?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

  const [isVisible, setIsVisible] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [activeTab, setActiveTab] = useState<'yearly' | 'monthly' | 'buyout'>('yearly');
  
  // 弹窗相关状态
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [teamId, setTeamId] = useState('');
  const [teamTitle, setTeamTitle] = useState('');
  const [teamIdError, setTeamIdError] = useState('');
  const [preloadIframe, setPreloadIframe] = useState(false);

  // 解析URL参数
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlTeamId = urlParams.get('team_id');
    const urlTeamTitle = urlParams.get('team_title');
    
    if (urlTeamId) {
      setTeamId(urlTeamId);
    }
    if (urlTeamTitle) {
      setTeamTitle(urlTeamTitle);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setAnimateElements(true);
      }, 300);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // 预加载 iframe，延迟加载避免影响页面初始性能
  useEffect(() => {
    // 立即添加 DNS 预解析和预连接
    const contactSalesUrl = CONTENT.contactSalesLink;
    const hostname = new URL(contactSalesUrl).origin;
    
    // 添加 DNS 预解析
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = hostname;
    document.head.appendChild(dnsPrefetch);
    
    // 添加预连接
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = hostname;
    document.head.appendChild(preconnect);

    // 延迟加载 iframe
    const preloadTimer = setTimeout(() => {
      console.log('🚀 开始预加载联系销售表单 iframe');
      setPreloadIframe(true);
    }, 1000); // 页面加载 1 秒后开始预加载

    return () => {
      clearTimeout(preloadTimer);
      // 清理添加的 link 标签
      if (document.head.contains(dnsPrefetch)) {
        document.head.removeChild(dnsPrefetch);
      }
      if (document.head.contains(preconnect)) {
        document.head.removeChild(preconnect);
      }
    };
  }, []);

  // 处理鼠标悬停在企业版卡片上时，立即触发预加载
  const handleEnterpriseCardHover = () => {
    if (!preloadIframe) {
      console.log('🎯 用户悬停企业版卡片，立即触发预加载');
      setPreloadIframe(true);
    }
  };

  // 监听预加载状态
  useEffect(() => {
    if (preloadIframe) {
      console.log('✅ 预加载 iframe 已渲染');
      console.log('📋 预加载 URL:', getContactSalesUrl());
    }
  }, [preloadIframe]);

  // 处理支付按钮点击
  const handlePaymentClick = (plan: any) => {
    if (plan.id === 'enterprise') {
      // 企业版：打开联系我们弹窗
      setShowContactModal(true);
      return;
    }
    
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  // 处理支付确认
  const handlePaymentConfirm = () => {
    // 验证team_id必填
    if (!teamId.trim()) {
      setTeamIdError(CONTENT.modal.teamIdRequired);
      return;
    }
    
    // 验证team_id格式
    if (!CONTENT.modal.teamIdPattern.test(teamId.trim())) {
      setTeamIdError(CONTENT.modal.teamIdPatternMessage);
      return;
    }
    
    setTeamIdError('');
    
    // 构建带参数的链接
    const link = STRIPE_LINKS[selectedPlan.id][activeTab];
    if (link) {
      const url = new URL(link, window.location.origin);
      url.searchParams.set('client_reference_id', teamId.trim());
      url.searchParams.set('locale', CONTENT.locale);
      window.open(url.toString(), '_blank');
    }
    
    setShowPaymentModal(false);
  };

  // 处理支付取消
  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
    setTeamIdError('');
  };

  // Build contact sales URL with parameters
  const getContactSalesUrl = () => {
    if (typeof window === 'undefined') return '';
    const url = new URL(CONTENT.contactSalesLink, window.location.origin);
    url.searchParams.set('team_id', teamId.trim());
    url.searchParams.set('team_title', teamTitle.trim());
    return url.toString();
  };
  
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
            <div className={`${styles.tabSlider} ${styles[`tabSlider${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`]}`} />
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
                <span className={styles.tabText}>
                  {CONTENT.yearly}
                  <span className={styles.yearlyBadge}>{CONTENT.yearlyBadge}</span>
                </span>
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
              onMouseEnter={plan.id === 'enterprise' ? handleEnterpriseCardHover : undefined}
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
                <button 
                  className={styles.orderButton}
                  onClick={() => handlePaymentClick(plan)}
                >
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

        {/* 支付确认弹窗 */}
        <Modal
          isOpen={showPaymentModal}
          onClose={handlePaymentCancel}
          title={CONTENT.modal.title}
          maxWidth="500px"
          footer={
            <>
              <button 
                className={styles.modalButtonCancel}
                onClick={handlePaymentCancel}
              >
                {CONTENT.modal.cancelButton}
              </button>
              <button 
                className={styles.modalButtonConfirm}
                onClick={handlePaymentConfirm}
              >
                {CONTENT.modal.confirmButton}
              </button>
            </>
          }
        >
          <div className={styles.formGroup}>
            <div className={styles.formLabelRow}>
              <label className={styles.formLabel}>
                {CONTENT.modal.teamIdLabel} *
              </label>
              <a 
                href={CONTENT.modal.teamIdHelpLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.helpLink}
              >
                {CONTENT.modal.teamIdHelpText}
              </a>
            </div>
            <input
              type="text"
              className={`${styles.formInput} ${teamIdError ? styles.formInputError : ''}`}
              value={teamId}
              onChange={(e) => {
                const value = e.target.value;
                setTeamId(value);
                
                // 清除错误状态
                if (teamIdError) {
                  setTeamIdError('');
                }
                
                // 实时验证格式（可选，提供即时反馈）
                if (value.trim() && !CONTENT.modal.teamIdPattern.test(value.trim())) {
                  setTeamIdError(CONTENT.modal.teamIdPatternMessage);
                }
              }}
              placeholder={CONTENT.modal.teamIdPlaceholder}
            />
            {teamIdError && (
              <div className={styles.errorMessage}>{teamIdError}</div>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              {CONTENT.modal.teamTitleLabel}
            </label>
            <input
              type="text"
              className={styles.formInput}
              value={teamTitle}
              onChange={(e) => setTeamTitle(e.target.value)}
              placeholder={CONTENT.modal.teamTitlePlaceholder}
            />
          </div>
          
          <div className={styles.modalPlanInfo}>
            <h4 className={styles.planInfoTitle}>
              {CONTENT.modal.purchasePlanTitle}
            </h4>
            <p className={styles.planInfoText}>
              {selectedPlan?.title} - {CONTENT[activeTab]}
            </p>
          </div>
        </Modal>

        {/* 企业版联系我们弹窗 */}
        <Modal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          title={CONTENT.contactSales}
          maxWidth="500px"
          // maxHeight="80vh"
          bodyStyle={{ padding: 0 }}
        >
          <iframe
            src={getContactSalesUrl()}
            style={{
              width: '100%',
              // height: '70vh',
              minHeight: '500px',
              border: 'none',
              display: 'block'
            }}
            title={CONTENT.contactSales}
            loading="eager"
          />
        </Modal>

        {/* 预加载 iframe - 隐藏但提前加载（使用完整 URL，包含参数） */}
        {preloadIframe && !showContactModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            visibility: 'hidden',
            pointerEvents: 'none',
            zIndex: -9999
          }}>
            <iframe
              src={getContactSalesUrl()}
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              title="Preload Contact Sales"
              aria-hidden="true"
            />
          </div>
        )}

      </div>
    </section>
  );
};

export default PricingSection;
