import React from 'react';
import PageLayout from '@site/src/components/PageLayout';
import PricingSection from '@site/src/components/CompsPricing/PricingSection';
import PricingFAQSection from '@site/src/components/CompsPricing/PricingFAQSection';
import styles from '@site/src/pages/pricing.module.css';

const PricingPage: React.FC = () => {
  return (
    <PageLayout 
      pageId="pricing"
      containerClassName={styles.container}
    >
      <PricingSection />
      <PricingFAQSection />
    </PageLayout>
  );
};

export default PricingPage;
