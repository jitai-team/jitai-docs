import React from 'react';
import PageLayout from '../../../src/components/PageLayout';
import PricingSection from '../../../src/components/price_comps/PricingSection';
import PricingContactSection from '../../../src/components/price_comps/PricingContactSection';
import PricingFAQSection from '../../../src/components/price_comps/PricingFAQSection';
import styles from '../../../src/pages/pricing.module.css';

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
