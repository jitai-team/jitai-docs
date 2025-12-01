/**
 * 阅读进度指示器
 * 在文档页面顶部显示阅读进度条
 */

function initReadingProgress() {
  // 确保在浏览器环境中运行
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  
  // 只在文档页面启用
  if (!document.querySelector('.theme-doc-markdown')) {
    return;
  }

  function updateProgress() {
    const docElement = document.documentElement;
    const scrollTop = docElement.scrollTop || document.body.scrollTop;
    const scrollHeight = docElement.scrollHeight - docElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    // 更新 CSS 变量
    docElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
  }

  // 监听滚动事件
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  
  // 初始化
  updateProgress();
}

export default function() {
  // 客户端模块导出函数 - 只在浏览器环境执行
  if (typeof window === 'undefined') {
    return {};
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReadingProgress);
  } else {
    initReadingProgress();
  }

  // 监听路由变化（Docusaurus 使用 React Router）
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(initReadingProgress, 100);
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(initReadingProgress, 100);
  };
  
  window.addEventListener('popstate', () => {
    setTimeout(initReadingProgress, 100);
  });

  return {
    onRouteUpdate() {
      setTimeout(initReadingProgress, 100);
    }
  };
}
