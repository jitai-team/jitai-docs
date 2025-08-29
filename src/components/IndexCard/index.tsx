import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import LinkGrid from './LinkGrid';

interface IndexCardProps {
  title: string;
  href: string;
  description: string;
  children?: React.ReactNode;
}

const IndexCard: React.FC<IndexCardProps> = ({ title, href, description, children }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle} id={title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}>
        <Link to={href} className={styles.cardTitleLink}>
          {title}
        </Link>
      </h3>
      <p className={styles.cardDescription}>
        {description}
      </p>
      {children && (
        <div className={styles.cardContent}>
          {children}
        </div>
      )}
    </div>
  );
};

export default IndexCard;
export { LinkGrid };
