import { type ReactNode, useEffect } from 'react';
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
    setModalOpen(isOpen);
    return () => setModalOpen(false);
  }, [isOpen, setModalOpen]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${isFading ? styles.fading : ''}`} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
