import React from 'react';
import PageLayout from '@site/src/components/PageLayout';
import DownloadSection from '@site/src/components/DownloadSection';
import styles from '@site/src/pages/download/index.module.css';

const DownloadPage: React.FC = () => {
  return (
    <PageLayout 
      pageId="download"
      containerClassName={styles.container}
    >
      <DownloadSection />
    </PageLayout>
  );
};

export default DownloadPage;
