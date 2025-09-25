import React, { useState, useRef, useEffect } from 'react';

interface SimpleLazyImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
  zoomable?: boolean;
}

const SimpleLazyImage: React.FC<SimpleLazyImageProps> = ({
  src,
  alt,
  style,
  className,
  zoomable = true,
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleZoomClose = () => setIsZoomed(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
      }
    };

    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isZoomed]);

  return (
    <>
      <div ref={imgRef} className={className} style={style}>
        {isInView ? (
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onClick={() => zoomable && isLoaded && setIsZoomed(true)}
            style={{
              width: '100%',
              height: 'auto',
              cursor: zoomable && isLoaded ? 'zoom-in' : 'default',
              transition: 'opacity 0.3s ease',
              opacity: isLoaded ? 1 : 0,
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
            }}
          >
            Loading...
          </div>
        )}
      </div>

      {isZoomed && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'zoom-out',
          }}
          onClick={handleZoomClose}
        >
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: '95vw',
              maxHeight: '95vh',
              objectFit: 'contain',
            }}
          />
        </div>
      )}
    </>
  );
};

export default SimpleLazyImage;
