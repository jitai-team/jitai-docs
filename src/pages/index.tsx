import React from 'react';
import PageLayout from '@site/src/components/PageLayout';
import HeroSection from '@site/src/components/home_comps/HeroSection';
import PlatformSection from '@site/src/components/home_comps/PlatformSection';
import FrameworkSection from '@site/src/components/home_comps/FrameworkSection';
import IDESection from '@site/src/components/home_comps/IDESection';
import DevOpsSection from '@site/src/components/home_comps/DevOpsSection';
import styles from '@site/src/pages/index.module.css';

const HomePage: React.FC = () => {
  return (
    <PageLayout 
      pageId="index"
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
