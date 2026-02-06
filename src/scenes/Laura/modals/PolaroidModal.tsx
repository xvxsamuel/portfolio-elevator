import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useGame } from '../../../context/GameProvider';
import { getPreloadedAudio } from '../../../hooks/usePreloader';
import polaroidImage from '../../../assets/images/interiors/laura/Polaroid.png';
import flashSound from '../../../assets/audio/laura/flash.mp3';
import styles from './PolaroidModal.module.css';

interface PolaroidModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PolaroidModal({ isOpen, onClose }: PolaroidModalProps) {
  const { setModalOpen, playerName, showDialogue } = useGame();
  const [phase, setPhase] = useState<'idle' | 'flash' | 'fading' | 'revealed' | 'dialogue'>('idle');
  const hasStartedRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (isOpen && !hasStartedRef.current) {
      hasStartedRef.current = true;
      setPhase('flash');

      const audio = getPreloadedAudio(flashSound);
      audio.volume = 0.6;
      audio.currentTime = 0;
      audio.play().catch(() => {});

      const fadeTimer = setTimeout(() => {
        setPhase('fading');
      }, 200);

      const revealTimer = setTimeout(() => {
        setPhase('revealed');
      }, 600);

      const dialogueTimer = setTimeout(() => {
        setPhase('dialogue');
        showDialogue("Uhhh....", playerName, onCloseRef.current);
      }, 2000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(revealTimer);
        clearTimeout(dialogueTimer);
      };
    }
    
    if (!isOpen) {
      hasStartedRef.current = false;
      setPhase('idle');
    }
  }, [isOpen, playerName, showDialogue]);

  useEffect(() => {
    setModalOpen(isOpen);
    return () => setModalOpen(false);
  }, [isOpen, setModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || phase !== 'dialogue') return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, phase, onClose]);

  if (!isOpen) return null;

  const showFlash = phase === 'flash' || phase === 'fading';
  const showPolaroid = phase === 'fading' || phase === 'revealed' || phase === 'dialogue';

  return createPortal(
    <>
      {showFlash && (
        <div className={`${styles.flash} ${phase === 'flash' ? styles.visible : styles.fading}`} />
      )}
      {showPolaroid && (
        <div className={styles.overlay}>
          <div className={styles.container}>
            <img src={polaroidImage} alt="Polaroid" className={styles.polaroid} />
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
