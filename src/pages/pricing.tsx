import React from 'react';
import PageLayout from '../components/PageLayout';
import PricingSection from '../components/price_comps/PricingSection';
import PricingFAQSection from '../components/price_comps/PricingFAQSection';
import PricingContactSection from '../components/price_comps/PricingContactSection';
import styles from './pricing.module.css';

const PricingPage: React.FC = () => {
  const pricingTitle = 'JitAI 定价方案 - 灵活的企业级 AI 开发平台';
  const pricingDesc = '选择适合您团队的 JitAI 定价方案，享受企业级 AI 开发平台的所有功能。支持按需付费和定制化解决方案。';

  return (
    <PageLayout 
      title={pricingTitle} 
      description={pricingDesc}
      containerClassName={styles.container}
    >
      <PricingSection />
      <PricingFAQSection />
      {/* <PricingContactSection /> */}
    </PageLayout>
  );
};

export default PricingPage;
