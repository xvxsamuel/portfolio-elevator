import { type ReactNode, useEffect } from 'react';
import { useGame } from '../../context/GameProvider';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isFading?: boolean;
  noParallax?: boolean;
}

export function Modal({ isOpen, onClose, children, isFading = false, noParallax = false }: ModalProps) {
  const { setModalOpen } = useGame();

  useEffect(() => {
    setModalOpen(isOpen);
    return () => setModalOpen(false);
  }, [isOpen, setModalOpen]);

  if (!isOpen) return null;

  const overlayClasses = [
    styles.overlay,
    isFading && styles.fading,
    noParallax && styles.noParallax
  ].filter(Boolean).join(' ');

  return (
    <div className={overlayClasses} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
