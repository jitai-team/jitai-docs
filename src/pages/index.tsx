import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProductSection from '../components/ProductSection';
import DevOpsSection from '../components/DevOpsSection';
import PlatformSection from '../components/PlatformSection';
import FrameworkSection from '../components/FrameworkSection';
import TechnologiesSection from '../components/TechnologiesSection';
import styles from './index.module.css';


const LayoutComponent = Layout as any;

const HomePage: React.FC = () => {
    useEffect(() => {
    // 添加页面标识
    document.body.setAttribute('data-page-id', 'home');

    // 隐藏Docusaurus默认navbar
    const hideDefaultNavbar = () => {
      const defaultNavbars = document.querySelectorAll('.theme-layout-navbar, .navbar--fixed-top, [data-theme="light"] .navbar, [data-theme="dark"] .navbar, .navbar:not(.custom-navbar)');
      defaultNavbars.forEach(navbar => {
        if (navbar instanceof HTMLElement) {
          navbar.style.display = 'none';
          navbar.style.visibility = 'hidden';
          navbar.style.opacity = '0';
          navbar.style.height = '0';
          navbar.style.overflow = 'hidden';
        }
      });
    };

    // 立即执行一次
    hideDefaultNavbar();

    // 监听DOM变化，确保在动态加载时也能隐藏
    const observer = new MutationObserver(hideDefaultNavbar);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      // 清理页面标识
      document.body.removeAttribute('data-page-id');
    };
  }, []);

  return (
    <LayoutComponent>
      <div className={styles.container}>
        <Navbar />
        <HeroSection />
        <ProductSection />
        <TechnologiesSection />
        <PlatformSection />
        <FrameworkSection />
        <DevOpsSection />
      </div>
    </LayoutComponent>
  );
};

export default HomePage;
