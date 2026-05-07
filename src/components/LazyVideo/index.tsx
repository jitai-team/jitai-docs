import React, { useState, useRef, useEffect, useCallback } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import styles from "./styles.module.css";

interface LazyVideoProps extends Omit<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    "onClick"
> {
    /** 视频源地址 (已在 VideoHTMLAttributes 中，但显式声明以增强提示) */
    src: string;
    /** 容器 className */
    className?: string;
    /** video 元素 className */
    videoClassName?: string;
    /** 触发加载的距离 */
    rootMargin?: string;
    /** 加载回调 */
    onLoad?: () => void;
    /** video ref 回调 */
    videoRef?: React.RefCallback<HTMLVideoElement>;
    /** 容器点击事件（挂载在外层 div 上） */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /** video 点击事件（挂载在 video 元素上） */
    onVideoClick?: React.MouseEventHandler<HTMLVideoElement>;
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
    className = "",
    videoClassName = "",
    rootMargin = "100px 0px",
    onLoad,
    onClick,
    onVideoClick,
    children,
    videoRef: externalVideoRef,
    ...rest
}) => {
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // 设置外部 ref
    const setVideoRef = useCallback(
        (el: HTMLVideoElement | null) => {
            (
                videoRef as React.MutableRefObject<HTMLVideoElement | null>
            ).current = el;
            if (externalVideoRef) {
                externalVideoRef(el);
            }
        },
        [externalVideoRef],
    );

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
            },
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [rootMargin]);

    // 视频加载完成后自动播放
    useEffect(() => {
        if (isLoaded && autoPlay && videoRef.current) {
            videoRef.current
                .play()
                .then(() => {
                    // 播放成功
                })
                .catch(() => {
                    // 自动播放被阻止，静默处理
                });
        }
    }, [isLoaded, autoPlay]);

    // 标记加载完成
    const markAsLoaded = useCallback(() => {
        if (!isLoaded) {
            setIsLoaded(true);
            onLoad?.();
        }
    }, [isLoaded, onLoad]);

    // 移动端超时保护：如果 3 秒后视频还没加载完，强制显示
    useEffect(() => {
        if (!isInView || isLoaded) return;

        const timer = setTimeout(() => {
            if (videoRef.current) {
                // 检查视频是否已经有数据
                if (videoRef.current.readyState >= 2) {
                    markAsLoaded();
                } else {
                    // 强制显示视频，让用户看到加载进度
                    markAsLoaded();
                }
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [isInView, isLoaded, markAsLoaded]);

    // 多种加载事件监听，确保移动端能正确触发
    const handleVideoReady = () => {
        markAsLoaded();
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
                        <img
                            src={poster}
                            alt="视频封面"
                            className={styles.posterImage}
                        />
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
                    className={`${styles.video} ${videoClassName} ${isLoaded ? styles.loaded : ""}`}
                    src={src}
                    poster={poster}
                    loop={loop}
                    muted={muted}
                    playsInline={playsInline}
                    controls={controls}
                    preload="auto"
                    onClick={onVideoClick}
                    onLoadedData={handleVideoReady}
                    onCanPlay={handleVideoReady}
                    onLoadedMetadata={handleVideoReady}
                    onPlaying={handleVideoReady}
                    {...rest}
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
    const { className = "", poster, children } = props;

    // SSR fallback - 渲染占位符
    const ssrFallback = (
        <div className={`${styles.lazyVideoContainer} ${className}`}>
            <div className={styles.placeholder}>
                {poster ? (
                    <img
                        src={poster}
                        alt="视频封面"
                        className={styles.posterImage}
                    />
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
