import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInUp';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animationType = 'fadeInUp',
  delay = 0,
  duration = 600, // 减少默认持续时间
  threshold = 0.05 // 降低阈值，让动画更早触发
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -150px 0px' // 进一步增加触发距离，让动画更早开始
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  // 优化延迟和持续时间：减少延迟，缩短动画时间
  const optimizedDelay = isMobile ? Math.max(0, delay * 0.3) : delay * 0.5; // 减少延迟
  const optimizedDuration = isMobile ? Math.min(duration, 400) : Math.min(duration, 500); // 缩短动画时间

  return (
    <div
      ref={ref}
      className={`${styles.animatedSection} ${styles[animationType]} ${className}`}
      style={{
        '--animation-delay': `${optimizedDelay}ms`,
        '--animation-duration': `${optimizedDuration}ms`,
        '--animation-duration-mobile': `${Math.min(optimizedDuration, 400)}ms`,
        '--animation-duration-mobile-small': `${Math.min(optimizedDuration, 300)}ms`
      } as React.CSSProperties}
      data-visible={isVisible}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;