import React, { useEffect } from 'react';
import styles from './styles.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  maxHeight?: string;
  footer?: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  onOverlayClick?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '600px',
  maxHeight,
  footer,
  bodyStyle,
  onOverlayClick
}) => {
  useEffect(() => {
    if (isOpen) {
      // 保存当前滚动位置并阻止底层页面滚动
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add('modal-open');
      
      // 保存滚动位置到 data 属性，供关闭时使用
      document.body.setAttribute('data-scroll-y', scrollY.toString());
    } else {
      // 恢复滚动位置
      const scrollY = document.body.getAttribute('data-scroll-y');
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      document.body.removeAttribute('data-scroll-y');
      
      if (scrollY) {
        // 使用 requestAnimationFrame 确保在正确的时机恢复滚动
        // 并明确指定不使用平滑滚动，避免移动端的滚动动画
        requestAnimationFrame(() => {
          window.scrollTo({
            top: parseInt(scrollY, 10),
            behavior: 'instant' as ScrollBehavior
          });
        });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (onOverlayClick) {
      onOverlayClick();
    } else {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div 
        className={styles.modalContent} 
        style={{ maxWidth, maxHeight }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button 
            className={styles.modalClose}
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        <div className={styles.modalBody} style={bodyStyle}>
          {children}
        </div>
        
        {footer && (
          <div className={styles.modalFooter}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

