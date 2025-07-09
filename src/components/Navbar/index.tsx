import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const CONTENT = {
  navItems: [
    { id: 0, label: '首页' },
    { id: 1, label: '产品介绍' },
    { id: 3, label: '技术特性' }
  ]
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // 检测当前活跃的section
      const sections = CONTENT.navItems.map(item => document.getElementById(`section-${item.id}`));
      const currentSection = sections.findIndex(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection !== -1) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionIndex: number) => {
    const element = document.getElementById(`section-${sectionIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionIndex);
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContent}>
        <div className={styles.logo} onClick={() => scrollToSection(0)}>
          <img src="/img/jit.png" alt="JitAi" />
          <span>JitAi</span>
        </div>
        <div className={styles.navLinks}>
          {CONTENT.navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={activeSection === index ? styles.active : ''}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;