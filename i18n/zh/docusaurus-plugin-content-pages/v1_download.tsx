import React from 'react';
import PageLayout from '../../../src/components/v1_PageLayout';
import DownloadSection from '../../../src/components/v1_DownloadSection';
import styles from '../../../src/pages/v1_download.module.css';

const DownloadPage: React.FC = () => {
  const downloadTitle = 'JitAI 下载安装 - 桌面版与服务器版';
  const downloadDesc = '下载 JitAI 桌面版用于本地开发，或选择服务器版进行生产部署。支持 Windows、Mac 和 Docker 安装方式。';

  return (
    <PageLayout 
      title={downloadTitle} 
      description={downloadDesc}
      containerClassName={styles.container}
    >
      <DownloadSection />
    </PageLayout>
  );
};

export default DownloadPage;
