import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProductSection from '../components/ProductSection';
import FeaturesSection from '../components/FeaturesSection';
import styles from './index.module.css';

const LayoutComponent = Layout as any;

const HomePage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 延迟显示，让页面先加载完成
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    const element = document.getElementById(`section-${sectionIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LayoutComponent>
      <div className={styles.container}>
        <Navbar onSectionChange={scrollToSection} />
        <HeroSection isVisible={isVisible} />
        <ProductSection />
        <FeaturesSection />
      </div>
    </LayoutComponent>
  );
};

export default HomePage;
