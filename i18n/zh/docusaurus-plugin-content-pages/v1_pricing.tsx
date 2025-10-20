import React from 'react';
import PageLayout from '../../../src/components/v1_PageLayout';
import PricingSection from '../../../src/components/v1_price_comps/PricingSection';
import PricingContactSection from '../../../src/components/v1_price_comps/PricingContactSection';
import PricingFAQSection from '../../../src/components/v1_price_comps/PricingFAQSection';
import styles from './v1_pricing.module.css';

const PricingPage: React.FC = () => {
  const pricingTitle = 'JitAI Pricing Plans - Flexible Enterprise AI Development Platform';
  const pricingDesc = 'Choose the JitAI pricing plan that fits your team and enjoy all features of our enterprise AI development platform. Supports pay-as-you-go and customized solutions.';

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
