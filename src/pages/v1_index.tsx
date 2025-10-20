import React from 'react';
import PageLayout from '../components/v1_PageLayout';
import HeroSection from '../components/v1_home_comps/HeroSection';
import ProductSection from '../components/v1_home_comps/ProductSection';
import DevOpsSection from '../components/v1_home_comps/DevOpsSection';
import IDESection from '../components/v1_home_comps/IDESection';
import PlatformSection from '../components/v1_home_comps/PlatformSection';
import FrameworkSection from '../components/v1_home_comps/FrameworkSection';
import TechnologiesSection from '../components/v1_home_comps/TechnologiesSection';
import styles from './v1_index.module.css';

const HomePage: React.FC = () => {
  const homeTitle = 'Next-Gen AI App Development Technology - JitAI';
  const homeDesc = "JitAI: The world's first interpreted app framework enabling AI agents to perceive and orchestrate systems in real-time, boosting development efficiency by 10x! Experience the new era of intelligent development now.";

  return (
    <PageLayout 
      title={homeTitle} 
      description={homeDesc}
      containerClassName={styles.container}
    >
      <HeroSection />
      <ProductSection />
      <TechnologiesSection />
      <PlatformSection />
      <FrameworkSection />
      <IDESection />
      <DevOpsSection />
    </PageLayout>
  );
};

export default HomePage;
