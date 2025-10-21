import React, { useEffect, ReactNode, cloneElement, isValidElement } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Navbar from './Navbar';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const LayoutComponent = Layout as unknown as React.ComponentType<any>;

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  containerClassName?: string;
  withLayout?: boolean; // 是否包裹主题 Layout，默认 true
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  containerClassName = '',
  withLayout = true,
}) => {
  const { i18n } = useDocusaurusContext();

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
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
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
