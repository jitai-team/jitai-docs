import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Navbar from '../../../src/components/Navbar';
import HeroSection from '../../../src/components/HeroSection';
import ProductSection from '../../../src/components/ProductSection';
import DevOpsSection from '../../../src/components/DevOpsSection';
import IDESection from '../../../src/components/IDESection';
import PlatformSection from '../../../src/components/PlatformSection';
import FrameworkSection from '../../../src/components/FrameworkSection';
import TechnologiesSection from '../../../src/components/TechnologiesSection';
import styles from './index.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


const LayoutComponent = Layout as any;

const HomePage: React.FC = () => {
  //   useEffect(() => {
  //   // 添加页面标识
  //   document.body.setAttribute('data-page-id', 'home');

  //   // 隐藏Docusaurus默认navbar
  //   const hideDefaultNavbar = () => {
  //     const defaultNavbars = document.querySelectorAll('.theme-layout-navbar, .navbar--fixed-top, [data-theme="light"] .navbar, [data-theme="dark"] .navbar, .navbar:not(.custom-navbar)');
  //     defaultNavbars.forEach(navbar => {
  //       if (navbar instanceof HTMLElement) {
  //         navbar.style.display = 'none';
  //         navbar.style.visibility = 'hidden';
  //         navbar.style.opacity = '0';
  //         navbar.style.height = '0';
  //         navbar.style.overflow = 'hidden';
  //       }
  //     });
  //   };

  //   // 立即执行一次
  //   hideDefaultNavbar();

  //   // 监听DOM变化，确保在动态加载时也能隐藏
  //   const observer = new MutationObserver(hideDefaultNavbar);
  //   observer.observe(document.body, { childList: true, subtree: true });

  //   return () => {
  //     observer.disconnect();
  //     // 清理页面标识
  //     document.body.removeAttribute('data-page-id');
  //   };
  // }, []);

  const { i18n } = useDocusaurusContext();
  useEffect(() => {
    document.documentElement.setAttribute('data-locale', i18n.currentLocale);
  }, []);
  

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
