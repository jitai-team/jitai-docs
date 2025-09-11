import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProductSection from '../components/ProductSection';
import DevOpsSection from '../components/DevOpsSection';
import IDESection from '../components/IDESection';
import PlatformSection from '../components/PlatformSection';
import FrameworkSection from '../components/FrameworkSection';
import TechnologiesSection from '../components/TechnologiesSection';
import styles from './index.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const LayoutComponent = Layout as any;

const HomePage: React.FC = () => {
  const { i18n } = useDocusaurusContext();
  useEffect(() => {
    document.documentElement.setAttribute('data-locale', i18n.currentLocale);
  }, [i18n.currentLocale]);
  
  return (
    <LayoutComponent>
      <div className={styles.container}>
        <Navbar currentLocale={i18n.currentLocale}/>
        <HeroSection currentLocale={i18n.currentLocale}/>
        <ProductSection currentLocale={i18n.currentLocale}/>
        <TechnologiesSection currentLocale={i18n.currentLocale}/>
        <PlatformSection currentLocale={i18n.currentLocale}/>
        <FrameworkSection currentLocale={i18n.currentLocale}/>
        <IDESection currentLocale={i18n.currentLocale}/>
        <DevOpsSection currentLocale={i18n.currentLocale}/>
      </div>
    </LayoutComponent>
  );
};

export default HomePage;
