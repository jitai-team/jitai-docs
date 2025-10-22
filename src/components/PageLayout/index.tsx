import React, { useEffect, ReactNode, cloneElement, isValidElement } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Navbar from './Navbar';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PAGE_METADATA_EN } from './page-metadata-en';
import { PAGE_METADATA_ZH } from './page-metadata-zh';

const LayoutComponent = Layout as React.ComponentType<any>;

interface PageLayoutProps {
  children: ReactNode;
  pageId: string;
  title?: string;
  description?: string;
  containerClassName?: string;
  withLayout?: boolean; // 是否包裹主题 Layout，默认 true
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  pageId,
  title,
  description,
  containerClassName = '',
  withLayout = true,
}) => {
  const { i18n } = useDocusaurusContext();

  // 根据 pageId 和语言获取页面元数据
  const metadata = i18n.currentLocale === 'zh' ? PAGE_METADATA_ZH : PAGE_METADATA_EN;
  const pageMetadata = metadata[pageId] || metadata['index'];

  // 使用传入的 title/description 或默认的元数据
  const finalTitle = title || pageMetadata.title;
  const finalDescription = description || pageMetadata.description;

  useEffect(() => {
    document.body.setAttribute('data-page-type', 'custom-layout');

    // 清理函数：组件卸载时移除类名
    return () => {
      document.body.removeAttribute('data-page-type');
    };
  }, []);

  // 为子组件注入 currentLocale prop
  const childrenWithProps = React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<any>, { currentLocale: i18n.currentLocale });
    }
    return child;
  });

  const content = (
    <>
      <Head children={
        <>
          <title>{finalTitle}</title>
          <meta name="description" content={finalDescription} />
          <meta property="og:title" content={finalTitle} />
          <meta property="og:description" content={finalDescription} />
          <meta name="twitter:title" content={finalTitle} />
          <meta name="twitter:description" content={finalDescription} />
        </>
      } />
      <div className={`${containerClassName} custom-page`}>
        <Navbar currentLocale={i18n.currentLocale}/>
        {childrenWithProps}
      </div>
    </>
  );

  return withLayout ? <LayoutComponent>{content}</LayoutComponent> : content;
};

export default PageLayout;
