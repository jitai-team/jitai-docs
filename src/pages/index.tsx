import React from 'react';
import Layout from '@theme/Layout';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProductSection from '../components/ProductSection';
import FeaturesSection from '../components/FeaturesSection';
import styles from './index.module.css';

const LayoutComponent = Layout as any;

const HomePage: React.FC = () => {
  return (
    <LayoutComponent>
      <div className={styles.container}>
        <Navbar />
        <HeroSection />
        <ProductSection />
        <FeaturesSection />
      </div>
    </LayoutComponent>
  );
};

export default HomePage;
