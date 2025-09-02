import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// Fix TypeScript issue with Docusaurus Link component
const DocusaurusLink = Link as any;

interface LinkItem {
  text: string;
  href: string;
}

interface LinkGridProps {
  links: LinkItem[];
  columns?: 'auto' | 2 | 'vertical';
}

const LinkGrid: React.FC<LinkGridProps> = ({ links, columns = 'auto' }) => {
  const getGridStyle = () => {
    if (columns === 2) {
      return { gridTemplateColumns: 'repeat(2, 1fr)' };
    } else if (columns === 'vertical') {
      return { gridTemplateColumns: '1fr', gap: '6px 0' };
    }
    return {};
  };

  return (
    <div className={styles.linkGrid} style={getGridStyle()}>
      {links.map((link, index) => (
        <div key={index} className={styles.linkItem}>
          <DocusaurusLink to={link.href}>{link.text}</DocusaurusLink>
        </div>
      ))}
    </div>
  );
};

export default LinkGrid;
