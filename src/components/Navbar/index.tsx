import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { CONTENT } from './constant';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('home');
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
    };

    // 设置当前活跃的导航项
    const setCurrentActiveNav = () => {
      const currentPath = window.location.pathname;
      const currentItem = CONTENT.navItems.find(item => item.url === currentPath);
      if (currentItem) {
        setActiveNavItem(currentItem.id);
      }
    };

    setCurrentActiveNav();
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

      // 移动端点击后关闭菜单
      if (isMobile) {
        window.location.href = item.url;
        setIsMobileMenuOpen(false);
      } else {
        if (item.isNewTab) {
          window.open(item.url, '_blank');
        } else {
          window.location.href = item.url;
        }
      }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} custom-navbar`}>
      <div className={styles.navContent}>
        <div className={styles.logo} onClick={() => handleNavClick(CONTENT.navItems[0])}>
          <span>JitAi</span>
        </div>

        {/* 桌面端导航 */}
        <div className={`${styles.navLinks} ${styles.desktopNav}`}>
          {CONTENT.navItems.map((item, index) => {
            const isActive = item.id === activeNavItem;

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
              const isActive = item.id === activeNavItem;

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