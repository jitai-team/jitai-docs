import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  zoomable?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y5ZjlmOSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjY2NjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
  className,
  style,
  width,
  height,
  zoomable = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const handleImageClick = () => {
    if (zoomable && isLoaded && !hasError) {
      setIsZoomed(true);
    }
  };

  const handleZoomClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsZoomed(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isZoomed) {
      setIsZoomed(false);
    }
  };

  useEffect(() => {
    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isZoomed]);

  return (
    <>
      <div 
        ref={imgRef}
        className={`${styles.lazyImageContainer} ${className || ''} ${zoomable && isLoaded && !hasError ? styles.zoomable : ''}`}
        style={{ ...style, width, height }}
      >
        {!isInView ? (
          <img
            src={placeholder}
            alt={alt}
            className={styles.placeholder}
            style={{ width, height }}
          />
        ) : (
          <>
            <img
              src={hasError ? placeholder : src}
              alt={alt}
              onLoad={handleLoad}
              onError={handleError}
              onClick={handleImageClick}
              className={`${styles.actualImage} ${isLoaded ? styles.loaded : styles.loading}`}
              style={{ width, height }}
            />
            {!isLoaded && (
              <img
                src={placeholder}
                alt={alt}
                className={styles.placeholder}
                style={{ width, height }}
              />
            )}
          </>
        )}
        {zoomable && isLoaded && !hasError && (
          <div className={styles.zoomIndicator}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
        )}
      </div>
      
      {isZoomed && (
        <div className={styles.zoomOverlay} onClick={handleZoomClose}>
          <div className={styles.zoomContainer}>
            <img
              src={src}
              alt={alt}
              className={styles.zoomedImage}
            />
            <button 
              className={styles.closeButton}
              onClick={() => setIsZoomed(false)}
              aria-label="关闭放大图片"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LazyImage;
