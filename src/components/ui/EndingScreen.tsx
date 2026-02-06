import { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameProvider';
import { getPreloadedAudio } from '../../hooks/usePreloader';
import liftClickSound from '../../assets/audio/elevator/lift_click.mp3';
import styles from './EndingScreen.module.css';

interface EndingScreenProps {
  isVisible: boolean;
  onReturnToTitle: () => void;
}

export function EndingScreen({ isVisible, onReturnToTitle }: EndingScreenProps) {
  const { masterVolume } = useGame();
  const [showButton, setShowButton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const buttonTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isVisible) {
      buttonTimerRef.current = window.setTimeout(() => {
        setShowButton(true);
      }, 5000);
    } else {
      setShowButton(false);
      setIsFadingOut(false);
      if (buttonTimerRef.current) {
        clearTimeout(buttonTimerRef.current);
      }
    }

    return () => {
      if (buttonTimerRef.current) {
        clearTimeout(buttonTimerRef.current);
      }
    };
  }, [isVisible]);

  const handleClick = () => {
    if (!clickAudio.current) {
      clickAudio.current = getPreloadedAudio(liftClickSound);
    }
    clickAudio.current.volume = (masterVolume / 100) * 0.3;
    clickAudio.current.currentTime = 0;
    clickAudio.current.play();
    setIsFadingOut(true);
    setTimeout(() => {
      onReturnToTitle();
    }, 1500);
  };

  const overlayClasses = [
    styles.overlay,
    isVisible && styles.visible,
    isFadingOut && styles.fadingOut,
  ].filter(Boolean).join(' ');

  const buttonClasses = [
    styles.returnButton,
    showButton && styles.showButton,
  ].filter(Boolean).join(' ');

  return (
    <div className={overlayClasses}>
      <h1 className={styles.theEndText}>The End</h1>
      <button 
        className={buttonClasses} 
        onClick={handleClick}
        disabled={!showButton}
      >
        Return to Title
      </button>
    </div>
  );
}
