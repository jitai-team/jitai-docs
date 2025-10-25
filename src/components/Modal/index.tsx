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
      const currentScrollY = window.scrollY;
      document.body.style.top = `-${currentScrollY}px`;
      document.body.classList.add('modal-open');
    }

    return () => {
      if (isOpen) {
        // 恢复滚动位置
        const scrollY = document.body.style.top;
        document.body.classList.remove('modal-open');
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
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

