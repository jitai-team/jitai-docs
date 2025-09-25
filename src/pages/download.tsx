import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Navbar from '../components/Navbar';
import DownloadSection from '../components/DownloadSection';
import styles from './download.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const LayoutComponent = Layout as unknown as React.ComponentType<any>;

const DownloadPage: React.FC = () => {
  const { i18n } = useDocusaurusContext();
  const downloadTitle = 'JitAI 下载安装 - 桌面版与服务器版';
  const downloadDesc = '下载 JitAI 桌面版用于本地开发，或选择服务器版进行生产部署。支持 Windows、Mac 和 Docker 安装方式。';

  useEffect(() => {
    document.documentElement.setAttribute('data-locale', i18n.currentLocale);
  }, [i18n.currentLocale]);

  return (
    <LayoutComponent>
      <Head children={
        <>
          <title>{downloadTitle}</title>
          <meta name="description" content={downloadDesc} />
          <meta property="og:title" content={downloadTitle} />
          <meta property="og:description" content={downloadDesc} />
          <meta name="twitter:title" content={downloadTitle} />
          <meta name="twitter:description" content={downloadDesc} />
        </>
      } />
      <div className={`${styles.container} custom-page`}>
        <Navbar currentLocale={i18n.currentLocale}/>
        <DownloadSection currentLocale={i18n.currentLocale}/>
      </div>
    </LayoutComponent>
  );
};

export default DownloadPage;
