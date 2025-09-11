import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Navbar from '../components/Navbar';
import PricingSection from '../components/PricingSection';
import PricingFAQSection from '../components/PricingFAQSection';
import PricingContactSection from '../components/PricingContactSection';
import styles from './pricing.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const LayoutComponent = Layout as any;

const PricingPage: React.FC = () => {
  
  const { i18n } = useDocusaurusContext();
  useEffect(() => {
    document.documentElement.setAttribute('data-locale', i18n.currentLocale);
  }, [i18n.currentLocale]);
  
  return (
    <LayoutComponent>
      <div className={styles.container}>
        <Navbar currentLocale={i18n.currentLocale}/>
        <PricingSection currentLocale={i18n.currentLocale}/>
        <PricingFAQSection currentLocale={i18n.currentLocale}/>
        {/* <PricingContactSection currentLocale={i18n.currentLocale}/> */}
      </div>
    </LayoutComponent>
  );
};

export default PricingPage;
