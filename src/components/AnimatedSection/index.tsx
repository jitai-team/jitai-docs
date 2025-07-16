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
  duration = 800,
  threshold = 0.1
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
        rootMargin: '0px 0px -50px 0px'
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

  // 移动端优化：减少延迟和持续时间
  const optimizedDelay = isMobile ? Math.max(0, delay * 0.5) : delay;
  const optimizedDuration = isMobile ? Math.min(duration, 600) : duration;

  return (
    <div
      ref={ref}
      className={`${styles.animatedSection} ${styles[animationType]} ${className}`}
      style={{
        '--animation-delay': `${optimizedDelay}ms`,
        '--animation-duration': `${optimizedDuration}ms`,
        '--animation-duration-mobile': `${Math.min(optimizedDuration, 600)}ms`,
        '--animation-duration-mobile-small': `${Math.min(optimizedDuration, 500)}ms`
      } as React.CSSProperties}
      data-visible={isVisible}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;