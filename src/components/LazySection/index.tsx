import React, { useState, useRef, useEffect, Suspense, ComponentType } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

interface LazySectionProps {
  /** 懒加载的组件 */
  component: React.LazyExoticComponent<ComponentType<any>>;
  /** 传递给组件的 props */
  componentProps?: Record<string, any>;
  /** 加载时显示的占位符 */
  fallback?: React.ReactNode;
  /** 触发加载的视口阈值 */
  threshold?: number;
  /** 提前触发的距离（像素） */
  rootMargin?: string;
  /** 最小占位高度 */
  minHeight?: number | string;
  /** 容器的 className */
  className?: string;
  /** 当前语言（由 PageLayout 注入） */
  currentLocale?: string;
}

/**
 * 客户端懒加载逻辑
 */
const ClientLazySection: React.FC<LazySectionProps> = ({
  component: Component,
  componentProps = {},
  fallback,
  threshold = 0,
  rootMargin = '200px 0px',
  minHeight = 400,
  className = '',
  currentLocale,
}) => {
  // 合并 componentProps 和 currentLocale
  const mergedProps = { ...componentProps, currentLocale };
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 检查是否已经在视口内
    const checkInitialVisibility = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // 如果元素顶部已经在视口内（考虑 rootMargin）
        if (rect.top < windowHeight + 200) {
          setShouldLoad(true);
          return true;
        }
      }
      return false;
    };

    // 如果已经可见，直接加载
    if (checkInitialVisibility()) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFallback = (
    <div
      style={{
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: '3px solid rgba(61, 101, 253, 0.1)',
          borderTopColor: '#3D65FD',
          borderRadius: '50%',
          animation: 'lazySectionSpin 0.8s linear infinite',
        }}
      />
      <style>{`
        @keyframes lazySectionSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <Suspense fallback={fallback || defaultFallback}>
          <Component {...mergedProps} />
        </Suspense>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  );
};

/**
 * SEO 友好的懒加载 Section 组件
 * 
 * - SSR/构建时：直接渲染组件内容（确保搜索引擎可索引）
 * - 客户端：使用 Intersection Observer 实现懒加载
 */
const LazySection: React.FC<LazySectionProps> = (props) => {
  const { component: Component, componentProps = {}, fallback, minHeight = 400, currentLocale } = props;
  // 合并 componentProps 和 currentLocale
  const mergedProps = { ...componentProps, currentLocale };

  const defaultFallback = (
    <div
      style={{
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    />
  );

  return (
    <BrowserOnly
      fallback={
        // SSR 时直接渲染组件，确保内容可被搜索引擎索引
        <Suspense fallback={fallback || defaultFallback}>
          <Component {...mergedProps} />
        </Suspense>
      }
    >
      {() => <ClientLazySection {...props} />}
    </BrowserOnly>
  );
};

export default LazySection;
