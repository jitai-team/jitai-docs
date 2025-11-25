import React, { lazy } from 'react';
import PageLayout from '@site/src/components/PageLayout';
import HeroSection from '@site/src/components/CompsHome/HeroSection';
import LazySection from '@site/src/components/LazySection';
import styles from '@site/src/pages/index.module.css';

// 非首屏组件使用 lazy 动态导入
const PlatformSection = lazy(() => import('@site/src/components/CompsHome/PlatformSection'));
const FrameworkSection = lazy(() => import('@site/src/components/CompsHome/FrameworkSection'));
const IDESection = lazy(() => import('@site/src/components/CompsHome/IDESection'));
const DevOpsSection = lazy(() => import('@site/src/components/CompsHome/DevOpsSection'));

const HomePage: React.FC = () => {
  return (
    <PageLayout 
      pageId="index"
      containerClassName={styles.container}
    >
      {/* 首屏立即加载 */}
      <HeroSection />
      
      {/* 非首屏懒加载 */}
      <LazySection 
        component={PlatformSection} 
        minHeight={600}
        rootMargin="300px 0px"
      />
      <LazySection 
        component={FrameworkSection} 
        minHeight={800}
        rootMargin="300px 0px"
      />
      <LazySection 
        component={IDESection} 
        minHeight={1000}
        rootMargin="300px 0px"
      />
      <LazySection 
        component={DevOpsSection} 
        minHeight={600}
        rootMargin="300px 0px"
      />
    </PageLayout>
  );
};

export default HomePage;
