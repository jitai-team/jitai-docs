import React from 'react';
import styles from './styles.module.css';

interface NavbarProps {
  onSectionChange: (sectionIndex: number) => void;
}

const CONTENT = {
  navItems: [
    { id: 0, label: '首页' },
    { id: 1, label: '产品介绍' },
    { id: 3, label: '技术特性' }
  ]
};

const Navbar: React.FC<NavbarProps> = ({ onSectionChange }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          <img src="/img/jit.png" alt="JitAi" />
          <span>JitAi</span>
        </div>
        <div className={styles.navLinks}>
          {CONTENT.navItems.map(item => (
            <button key={item.id} onClick={() => onSectionChange(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;