import React from 'react';
import SimpleLazyImage from '../SimpleLazyImage';

interface MDXLazyImageProps {
  src: string;
  alt?: string;
  title?: string;
  width?: number | string;
  height?: number | string;
  zoomable?: boolean;
}

const MDXLazyImage: React.FC<MDXLazyImageProps> = ({
  src,
  alt = '',
  title,
  width,
  height,
  zoomable = true,
}) => {
  return (
    <figure style={{ margin: '1rem 0', textAlign: 'center' }}>
      <SimpleLazyImage
        src={src}
        alt={alt}
        zoomable={zoomable}
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          width: width || '100%',
        }}
      />
      {title && (
        <figcaption style={{ 
          marginTop: '0.5rem', 
          fontSize: '0.875rem', 
          color: 'var(--ifm-color-content-secondary)' 
        }}>
          {title}
        </figcaption>
      )}
    </figure>
  );
};

export default MDXLazyImage;
