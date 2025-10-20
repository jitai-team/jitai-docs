import React from 'react';
import PageLayout from '../components/PageLayout';
import HeroSection from '../components/home_comps/HeroSection';
import PlatformSection from '../components/home_comps/PlatformSection';
import FrameworkSection from '../components/home_comps/FrameworkSection';
import IDESection from '../components/home_comps/IDESection';
import DevOpsSection from '../components/home_comps/DevOpsSection';
import styles from './index.module.css';

const HomePage: React.FC = () => {
  const homeTitle = 'JitAI - Quickly Build Production-Grade AI Apps';
  const homeDesc = "The world's first interpreted app framework enabling AI agents to perceive and orchestrate systems in real-time, boosting development efficiency by 10x! ";

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
