import React from 'react';
import PageLayout from '../components/PageLayout';
import HeroSection from '../components/home_comps/HeroSection';
import ProductSection from '../components/home_comps/ProductSection';
import PlatformSection from '../components/home_comps/PlatformSection';
import FrameworkSection from '../components/home_comps/FrameworkSection';
import IDESection from '../components/home_comps/IDESection';
import DevOpsSection from '../components/home_comps/DevOpsSection';
import styles from './index.module.css';

const HomePage: React.FC = () => {
  const homeTitle = 'JitAI - Production-grade AI Application Development Platform';
  const homeDesc = "JitAI: Production-grade AI application development platform, accelerating AI application scaling. Experience the new era of intelligent development with our comprehensive AI application solutions.";

  return (
    <PageLayout 
      title={homeTitle} 
      description={homeDesc}
      containerClassName={styles.container}
    >
      <HeroSection />
      <PlatformSection />
      <FrameworkSection />
      <IDESection />
      <DevOpsSection />
    </PageLayout>
  );
};

export default HomePage;
