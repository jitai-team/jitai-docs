import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Navbar from '../components/Navbar';
import PricingSection from '../components/PricingSection';
import PricingFAQSection from '../components/PricingFAQSection';
import styles from './pricing.module.css';

const LayoutComponent = Layout as any;

const PricingPage: React.FC = () => {

  return (
    <LayoutComponent>
      <div className={styles.container}>
        <Navbar />
        <PricingSection />
        <PricingFAQSection />
      </div>
    </LayoutComponent>
  );
};

export default PricingPage;
