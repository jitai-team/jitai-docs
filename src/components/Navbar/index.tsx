import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const CONTENT = {
  navItems: [
    { id: 0, label: '首页', type: 'section' },
    { id: 1, label: '产品介绍', type: 'section' },
    { id: 3, label: '技术特性', type: 'section' },
    { id: 'guide', label: '开发指南', type: 'link', url: './docs/tutorial/00快速上手/01下载安装' },
    { id: 'community', label: '社区', type: 'link', url: './docs/community/intro' }
  ]
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // 检测当前活跃的section（只检测section类型的导航项）
      const sectionItems = CONTENT.navItems.filter(item => item.type === 'section');
      const sections = sectionItems.map(item => document.getElementById(`section-${item.id}`));
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 移动端菜单状态变化时控制背景滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (item: any) => {
    if (item.type === 'section') {
      const element = document.getElementById(`section-${item.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(CONTENT.navItems.filter(navItem => navItem.type === 'section').findIndex(navItem => navItem.id === item.id));
      }
    } else if (item.type === 'link') {
      window.open(item.url, '_blank');
    }

    // 移动端点击后关闭菜单
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} custom-navbar`}>
      <div className={styles.navContent}>
        <div className={styles.logo} onClick={() => handleNavClick({ id: 0, type: 'section' })}>
          <span>JitAi</span>
        </div>

        {/* 桌面端导航 */}
        <div className={`${styles.navLinks} ${styles.desktopNav}`}>
          {CONTENT.navItems.map((item, index) => {
            const isActive = item.type === 'section' &&
              CONTENT.navItems.filter(navItem => navItem.type === 'section').findIndex(navItem => navItem.id === item.id) === activeSection;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={isActive ? styles.active : ''}
                data-type={item.type}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* 移动端汉堡菜单按钮 */}
        <button
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="切换菜单"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* 移动端导航菜单 */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileNavLinks}>
            {CONTENT.navItems.map((item, index) => {
              const isActive = item.type === 'section' &&
                CONTENT.navItems.filter(navItem => navItem.type === 'section').findIndex(navItem => navItem.id === item.id) === activeSection;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`${styles.mobileNavItem} ${isActive ? styles.active : ''} mobile-nav-item`}
                  data-type={item.type}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 移动端菜单遮罩 */}
        {isMobileMenuOpen && (
          <div className={styles.mobileOverlay} onClick={() => setIsMobileMenuOpen(false)} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;