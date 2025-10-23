import React from 'react';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';
import styles from './legal-documents.module.css';

interface LegalDocumentProps {
  type: 'privacy' | 'service';
}

export const LegalDocumentPage: React.FC<LegalDocumentProps> = ({ type }) => {
  const content = type === 'privacy' ? <PrivacyPolicy /> : <TermsOfService />;

  return (
    <div className={styles.legalDocumentContainer}>
      <div className={styles.legalDocumentBody}>
        {content}
      </div>
    </div>
  );
};
