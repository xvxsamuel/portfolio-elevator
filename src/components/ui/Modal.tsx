import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useGame } from '../../context/GameProvider';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isFading?: boolean;
}

export function Modal({ isOpen, onClose, children, isFading = false }: ModalProps) {
  const { setModalOpen } = useGame();

  useEffect(() => {
    setModalOpen(isOpen && !isFading);
    return () => setModalOpen(false);
  }, [isOpen, isFading, setModalOpen]);

  if (!isOpen) return null;

  const overlayClasses = [
    styles.overlay,
    isFading && styles.fading,
  ].filter(Boolean).join(' ');

  return createPortal(
    <div className={overlayClasses} onClick={onClose}>
      <div className={styles.content}>
        {children}
      </div>
    </div>,
    document.body
  );
}
