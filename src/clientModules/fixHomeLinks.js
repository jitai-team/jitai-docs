/**
 * 客户端模块：确保首页的 canonical 和 alternate 链接不带尾部斜杠
 * 防止 Docusaurus 在客户端重新生成带斜杠的链接
 */

function fixHomeLinks() {
  // 确保在浏览器环境中运行
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // 只在首页执行
  const pathname = window.location.pathname;
  const isHomePage = pathname === '/' || pathname === '/zh' || pathname === '/zh/';
  
  if (!isHomePage) {
    return;
  }

  console.log('[fixHomeLinks] 修复首页链接');

  // 修复 canonical 链接
  const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
  canonicalLinks.forEach(link => {
    if (link.href.endsWith('/')) {
      link.href = link.href.slice(0, -1);
      console.log('[fixHomeLinks] 修复 canonical:', link.href);
    }
  });

  // 修复 alternate 链接
  const alternateLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
  alternateLinks.forEach(link => {
    if (link.href.endsWith('/')) {
      link.href = link.href.slice(0, -1);
      console.log('[fixHomeLinks] 修复 alternate:', link.href);
    }
  });

  // 修复 og:url meta 标签
  const ogUrlMeta = document.querySelector('meta[property="og:url"]');
  if (ogUrlMeta && ogUrlMeta.content.endsWith('/')) {
    ogUrlMeta.content = ogUrlMeta.content.slice(0, -1);
    console.log('[fixHomeLinks] 修复 og:url:', ogUrlMeta.content);
  }
}

// 导出为 Docusaurus 客户端模块
export default function() {
  // 只在浏览器环境执行
  if (typeof window === 'undefined') {
    return {};
  }

  // 页面加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixHomeLinks);
  } else {
    fixHomeLinks();
  }

  return {
    onRouteUpdate({ location }) {
      // 路由更新时也执行修复
      setTimeout(fixHomeLinks, 100);
    }
  };
}

