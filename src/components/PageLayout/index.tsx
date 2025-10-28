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

  // 获取当前页面的完整 URL（不带末尾斜杠）
  const siteUrl = 'https://jit.pro';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  // 移除末尾的斜杠
  const cleanPath = currentPath.endsWith('/') && currentPath !== '/' ? currentPath.slice(0, -1) : currentPath;
  const canonicalUrl = i18n.currentLocale === 'zh' 
    ? `${siteUrl}/zh${cleanPath === '/zh' ? '' : cleanPath.replace('/zh', '')}`
    : `${siteUrl}${cleanPath === '/' ? '' : cleanPath}`;
  
  // 构建 alternate 链接
  const alternateUrls = {
    'en': cleanPath === '/' || cleanPath === '' ? siteUrl : `${siteUrl}${cleanPath}`,
    'zh': cleanPath === '/' || cleanPath === '' ? `${siteUrl}/zh` : `${siteUrl}/zh${cleanPath}`,
  };

  useEffect(() => {
    document.body.setAttribute('data-page-type', 'custom-layout');

    // 移除重复的 canonical 和 alternate 链接，只保留我们的版本
    const removeDuplicateLinks = () => {
      // 获取所有 canonical 链接，只保留第一个（我们通过 link prop 添加的）
      const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
      if (canonicalLinks.length > 1) {
        // 保留第一个，移除其余的
        Array.from(canonicalLinks).slice(1).forEach((link) => link.remove());
      }

      // 获取所有 alternate 链接
      const alternateLinks = document.querySelectorAll('link[rel="alternate"]');
      // 我们期望的 alternate 链接（使用当前的 URL 值）
      const expectedAlternates = [
        { href: alternateUrls.en, hrefLang: 'en' },
        { href: alternateUrls.zh, hrefLang: 'zh' },
        { href: alternateUrls.en, hrefLang: 'x-default' },
      ];
      
      // 移除不匹配的 alternate 链接
      alternateLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const hrefLang = link.getAttribute('hreflang');
        
        // 检查是否是我们期望的链接之一
        const isExpected = expectedAlternates.some(
          (expected) => expected.href === href && expected.hrefLang === hrefLang
        );
        
        // 如果不是期望的链接，移除它
        if (!isExpected) {
          link.remove();
        }
      });
    };

    // 延迟执行清理，确保所有链接都已添加
    const timeoutId = setTimeout(removeDuplicateLinks, 100);

    // 使用 MutationObserver 监听 head 的变化，以防 Docusaurus 后续添加
    const observer = new MutationObserver(() => {
      removeDuplicateLinks();
    });
    
    observer.observe(document.head, {
      childList: true,
      subtree: true,
    });

    // 清理函数
    return () => {
      clearTimeout(timeoutId);
      document.body.removeAttribute('data-page-type');
      observer.disconnect();
    };
  }, [currentPath, i18n.currentLocale]);

  // 为子组件注入 currentLocale prop
  const childrenWithProps = React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<any>, { currentLocale: i18n.currentLocale });
    }
    return child;
  });

  const content = (
    <>
      <Head 
        title={finalTitle}
        titleTemplate="%s - JitAI"
        meta={[
          { name: 'description', content: finalDescription },
          { property: 'og:title', content: finalTitle },
          { property: 'og:description', content: finalDescription },
          { name: 'twitter:title', content: finalTitle },
          { name: 'twitter:description', content: finalDescription },
          { property: 'og:url', content: canonicalUrl },
        ]}
        link={[
          { rel: 'canonical', href: canonicalUrl },
          { rel: 'alternate', href: alternateUrls.en, hrefLang: 'en' },
          { rel: 'alternate', href: alternateUrls.zh, hrefLang: 'zh' },
          { rel: 'alternate', href: alternateUrls.en, hrefLang: 'x-default' },
        ]}
        children={<></>}
      />
      <div className={`${containerClassName} custom-page`}>
        <Navbar currentLocale={i18n.currentLocale}/>
        {childrenWithProps}
      </div>
    </>
  );

  return withLayout ? <LayoutComponent>{content}</LayoutComponent> : content;
};

export default PageLayout;
