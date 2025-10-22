import React, { useEffect } from 'react';
import PageLayout from '../../../src/components/v1_PageLayout';
import HeroSection from '../../../src/components/v1_home_comps/HeroSection';
import ProductSection from '../../../src/components/v1_home_comps/ProductSection';
import DevOpsSection from '../../../src/components/v1_home_comps/DevOpsSection';
import IDESection from '../../../src/components/v1_home_comps/IDESection';
import PlatformSection from '../../../src/components/v1_home_comps/PlatformSection';
import FrameworkSection from '../../../src/components/v1_home_comps/FrameworkSection';
import TechnologiesSection from '../../../src/components/v1_home_comps/TechnologiesSection';
import styles from './v1.module.css';

const HomePage: React.FC = () => {
  const homeTitle = '下一代AI应用开发技术体系';
  const homeDesc = 'JitAI全球首创解释型应用架构，让AI智能体实时感知与编排系统，开发效率提升10倍！立即体验智能开发新时代。';

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
