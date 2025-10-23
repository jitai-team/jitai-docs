import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import LanguageSwitcher from '../LanguageSwitcher';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';
import { PAGE_METADATA_EN } from '../page-metadata-en';
import { PAGE_METADATA_ZH } from '../page-metadata-zh';

interface NavbarProps {
  currentLocale?: string;
  pageId?: string;
}

// 导出获取页面元数据的函数，供其他组件使用
export const usePageMetadata = (pageId: string, currentLocale?: string) => {
  const metadata = currentLocale === 'zh' ? PAGE_METADATA_ZH : PAGE_METADATA_EN;
  
  // 如果找不到对应的页面元数据，返回默认值
  if (!metadata[pageId]) {
    console.warn(`Page metadata not found for pageId: ${pageId}, locale: ${currentLocale}`);
    return {
      title: 'JitAI',
      description: 'JitAI - AI Development Platform'
    };
  }
  
  return metadata[pageId];
};

const Navbar: React.FC<NavbarProps> = ({ currentLocale, pageId }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

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
      
      // 首先尝试精确匹配
      let currentItem = CONTENT.navItems.find(item => item.url === currentPath);
      
      // 如果没有精确匹配，则尝试前缀匹配
      if (!currentItem) {
        currentItem = CONTENT.navItems.find(item => {
          // 确保不是根路径，避免误匹配
          if (item.url === '/' || item.url === '/zh') {
            return false;
          }
          return currentPath.startsWith(item.url);
        });
      }
      
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
        if (item.type === 'newTab') {
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
        {/* Logo 和导航菜单在左侧 */}
        <div className={styles.leftSection}>
          <div className={styles.logo} onClick={() => handleNavClick(CONTENT.navItems[0])}>
            <img src="https://jit-www.oss-cn-beijing.aliyuncs.com/logo/logo_title.png" alt="JitAI" />
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
        </div>

        {/* 右侧区域：语言切换器、Download 按钮和 Try Online 按钮 */}
        <div className={styles.rightSection}>
          <LanguageSwitcher className={styles.languageSwitcher} />
          <button
            className={styles.tryOnlineButton}
            onClick={() => handleNavClick(CONTENT.tryOnlineButton)}
            data-type={CONTENT.tryOnlineButton.type}
          >
            {CONTENT.tryOnlineButton.label}
          </button>
          <button
            className={styles.downloadButton}
            onClick={() => handleNavClick(CONTENT.downloadButton)}
            data-type={CONTENT.downloadButton.type}
          >
            {CONTENT.downloadButton.label}
          </button>
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
            <div className={styles.mobileLanguageSwitcher}>
              <LanguageSwitcher />
            </div>
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
