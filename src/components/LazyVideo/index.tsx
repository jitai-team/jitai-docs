import React, { useState, useRef, useEffect, useCallback } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

interface LazyVideoProps {
  /** 视频源地址 */
  src: string;
  /** 封面图片（可选，推荐使用视频第一帧） */
  poster?: string;
  /** 是否自动播放（进入视口后） */
  autoPlay?: boolean;
  /** 是否循环播放 */
  loop?: boolean;
  /** 是否静音 */
  muted?: boolean;
  /** 是否内联播放（iOS） */
  playsInline?: boolean;
  /** 是否显示控件 */
  controls?: boolean;
  /** 容器 className */
  className?: string;
  /** video 元素 className */
  videoClassName?: string;
  /** 触发加载的距离 */
  rootMargin?: string;
  /** 加载回调 */
  onLoad?: () => void;
  /** 点击回调 */
  onClick?: () => void;
  /** 子元素（覆盖层等） */
  children?: React.ReactNode;
  /** video ref 回调 */
  videoRef?: React.RefCallback<HTMLVideoElement>;
}

/**
 * 客户端视频懒加载实现
 */
const ClientLazyVideo: React.FC<LazyVideoProps> = ({
  src,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  className = '',
  videoClassName = '',
  rootMargin = '100px 0px',
  onLoad,
  onClick,
  children,
  videoRef: externalVideoRef,
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 设置外部 ref
  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
    if (externalVideoRef) {
      externalVideoRef(el);
    }
  }, [externalVideoRef]);

  // 监测视口
  useEffect(() => {
    // 检查是否已经在视口内
    const checkInitialVisibility = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight + 100) {
          setIsInView(true);
          return true;
        }
      }
      return false;
    };

    if (checkInitialVisibility()) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  // 视频加载完成后自动播放
  useEffect(() => {
    if (isLoaded && autoPlay && videoRef.current) {
      videoRef.current.play().then(() => {
        // 播放成功
      }).catch(() => {
        // 自动播放被阻止，静默处理
      });
    }
  }, [isLoaded, autoPlay]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.lazyVideoContainer} ${className}`}
      onClick={onClick}
    >
      {/* 加载占位符 */}
      {(!isInView || !isLoaded) && (
        <div className={styles.placeholder}>
          {poster ? (
            <img src={poster} alt="视频封面" className={styles.posterImage} />
          ) : (
            <div className={styles.loadingSpinner}>
              <div className={styles.spinner} />
            </div>
          )}
        </div>
      )}

      {/* 视频元素 */}
      {isInView && (
        <video
          ref={setVideoRef}
          className={`${styles.video} ${videoClassName} ${isLoaded ? styles.loaded : ''}`}
          src={src}
          poster={poster}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          controls={controls}
          preload="metadata"
          onLoadedData={handleLoadedData}
        />
      )}

      {/* 子元素（覆盖层等） */}
      {children}
    </div>
  );
};

/**
 * SSR 友好的懒加载视频组件
 * 
 * - SSR 时：渲染占位符（视频不影响 SEO）
 * - 客户端：仅当视频进入视口时才加载资源
 */
const LazyVideo: React.FC<LazyVideoProps> = (props) => {
  const { className = '', poster, children } = props;

  // SSR fallback - 渲染占位符
  const ssrFallback = (
    <div className={`${styles.lazyVideoContainer} ${className}`}>
      <div className={styles.placeholder}>
        {poster ? (
          <img src={poster} alt="视频封面" className={styles.posterImage} />
        ) : (
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner} />
          </div>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <BrowserOnly fallback={ssrFallback}>
      {() => <ClientLazyVideo {...props} />}
    </BrowserOnly>
  );
};

export default LazyVideo;
