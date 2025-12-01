import React from 'react';
import PageLayout from '@site/src/components/PageLayout';
import ReferralHeroSection from '@site/src/components/CompsReferral/ReferralHeroSection';
import ReferralRulesSection from '@site/src/components/CompsReferral/ReferralRulesSection';
import ReferralStepsSection from '@site/src/components/CompsReferral/ReferralStepsSection';
import styles from '@site/src/pages/referral.module.css';

const ReferralPage: React.FC = () => {
  return (
    <PageLayout 
      pageId="referral"
      containerClassName={styles.container}
    >
      <ReferralHeroSection />
      <ReferralStepsSection />
      <ReferralRulesSection />
    </PageLayout>
  );
};

export default ReferralPage;

