import React from 'react';
import PageLayout from '../components/PageLayout';
import DownloadSection from '../components/DownloadSection';
import styles from './download.module.css';

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
