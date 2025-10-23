import React from 'react';
import PageLayout from '@site/src/components/PageLayout';
import MacSecurityPageComponent from '@site/src/components/MacSecurity';
import styles from '@site/src/pages/download/mac-security.module.css';

const MacSecurityPage: React.FC = () => {
  return (
    <PageLayout 
      pageId="mac-security"
      containerClassName={styles.container}
    >
      <MacSecurityPageComponent/>
    </PageLayout>
  );
};

export default MacSecurityPage;
