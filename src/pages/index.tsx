import React from 'react';
import PageLayout from '@site/src/components/PageLayout';
import HeroSection from '@site/src/components/CompsHome/HeroSection';
import PlatformSection from '@site/src/components/CompsHome/PlatformSection';
import FrameworkSection from '@site/src/components/CompsHome/FrameworkSection';
import IDESection from '@site/src/components/CompsHome/IDESection';
import DevOpsSection from '@site/src/components/CompsHome/DevOpsSection';
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
