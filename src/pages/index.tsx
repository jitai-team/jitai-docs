import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
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
  const homeTitle = 'Next-Gen AI App Development Technology - JitAI';
  const homeDesc = "JitAI: The world's first interpreted app framework enabling AI agents to perceive and orchestrate systems in real-time, boosting development efficiency by 10x! Experience the new era of intelligent development now.";
  useEffect(() => {
    document.documentElement.setAttribute('data-locale', i18n.currentLocale);
  }, [i18n.currentLocale]);

  return (
    <LayoutComponent>
      <Head>
        <title>{homeTitle}</title>
        <meta name="description" content={homeDesc} />
        <meta property="og:title" content={homeTitle} />
        <meta property="og:description" content={homeDesc} />
        <meta name="twitter:title" content={homeTitle} />
        <meta name="twitter:description" content={homeDesc} />
      </Head>
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
