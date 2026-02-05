import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useGame } from '../../../../context/GameProvider';
import { DialogueBox } from '../../../../components/ui/DialogueBox';
import polaroidImage from '../../../../assets/images/interiors/laura/Polaroid.png';
import flashSound from '../../../../assets/audio/laura/flash.mp3';
import styles from './PolaroidModal.module.css';

interface PolaroidModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PolaroidModal({ isOpen, onClose }: PolaroidModalProps) {
  const { setModalOpen, playerName } = useGame();
  const [showFlash, setShowFlash] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowFlash(true);
      setShowModal(false);

      const audio = new Audio(flashSound);
      audio.volume = 0.6;
      audio.play().catch(() => {});

      const flashTimer = setTimeout(() => {
        setShowFlash(false);
        setShowModal(true);
      }, 300);

      return () => clearTimeout(flashTimer);
    } else {
      setShowFlash(false);
      setShowModal(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setModalOpen(isOpen);
    return () => setModalOpen(false);
  }, [isOpen, setModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !showModal) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showModal, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className={`${styles.flash} ${showFlash ? styles.visible : styles.fading}`} />
      {showModal && (
        <div className={styles.overlay} onClick={onClose}>
          <div className={styles.container}>
            <img src={polaroidImage} alt="Polaroid" className={styles.polaroid} />
          </div>
          <div onClick={e => e.stopPropagation()}>
            <DialogueBox
              text="Uhhh...."
              speaker={playerName}
              isVisible={true}
              onComplete={onClose}
            />
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
