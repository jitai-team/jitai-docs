import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import globalStyles from '../../../pages/index.module.css';
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
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [teamId, setTeamId] = useState('');
  const [teamTitle, setTeamTitle] = useState('');
  const [teamIdError, setTeamIdError] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

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

  // 组件卸载时清理滚动状态
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
    };
  }, []);

  // 处理支付按钮点击
  const handlePaymentClick = (plan: any) => {
    if (plan.id === 'enterprise') {
      // 企业版：显示即将支持提示
      setShowComingSoonModal(true);
      return;
    }
    
    setSelectedPlan(plan);
    setShowModal(true);
    
    // 保存当前滚动位置并阻止底层页面滚动
    const currentScrollY = window.scrollY;
    setScrollPosition(currentScrollY);
    document.body.style.top = `-${currentScrollY}px`;
    document.body.classList.add('modal-open');
  };

  // 处理弹窗确认
  const handleModalConfirm = () => {
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
    
    setShowModal(false);
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
  };

  // 处理弹窗取消
  const handleModalCancel = () => {
    setShowModal(false);
    setTeamIdError('');
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
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
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>
                  {CONTENT.modal.title}
                </h3>
                <button 
                  className={styles.modalClose}
                  onClick={handleModalCancel}
                >
                  ×
                </button>
              </div>
              
              <div className={styles.modalBody}>
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
              </div>
              
              <div className={styles.modalFooter}>
                <button 
                  className={styles.modalButtonCancel}
                  onClick={handleModalCancel}
                >
                  {CONTENT.modal.cancelButton}
                </button>
                <button 
                  className={styles.modalButtonConfirm}
                  onClick={handleModalConfirm}
                >
                  {CONTENT.modal.confirmButton}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 即将支持提示弹窗 */}
        {showComingSoonModal && (
          <div className={styles.modalOverlay} onClick={() => setShowComingSoonModal(false)}>
            <div className={styles.modalContent} style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>
                  {currentLocale === 'zh' ? '即将支持' : 'Coming Soon'}
                </h3>
                <button 
                  className={styles.modalClose}
                  onClick={() => setShowComingSoonModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className={styles.modalBody}>
                <p style={{ textAlign: 'center', fontSize: '16px', color: '#666', margin: '20px 0' }}>
                  {currentLocale === 'zh' 
                    ? '即将上线，敬请期待！' 
                    : 'Feature will be available soon. Stay tuned!'}
                </p>
              </div>
              
              <div className={styles.modalFooter}>
                <button 
                  className={styles.modalButtonConfirm}
                  onClick={() => setShowComingSoonModal(false)}
                  style={{ width: '100%' }}
                >
                  {currentLocale === 'zh' ? '知道了' : 'Got it'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default PricingSection;
