import { useState, useRef, useEffect } from 'react';
import { useGame } from '../../../context/GameProvider';
import { OptionsPanel } from './OptionsPanel';
import { getPreloadedAudio } from '../../../hooks/usePreloader';
import liftClickSound from '../../../assets/audio/elevator/lift_click.mp3';
import titleElevator from '../../../assets/images/title/title_elevator.png';
import styles from './TitleScreen.module.css';

interface TitleScreenProps {
  isVisible: boolean;
  onStart: () => void;
}

export function TitleScreen({ isVisible, onStart }: TitleScreenProps) {
  const { masterVolume } = useGame();
  const [showOptions, setShowOptions] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isShaftFading, setIsShaftFading] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(true);
  const clickAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isVisible) {
      setIsFadingOut(false);
      setIsShaftFading(false);
      setShowOptions(false);
      setIsFadingIn(true);
      const timer = setTimeout(() => setIsFadingIn(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const playClick = () => {
    if (!clickAudio.current) {
      clickAudio.current = getPreloadedAudio(liftClickSound);
    }
    clickAudio.current.volume = (masterVolume / 100) * 0.3;
    clickAudio.current.currentTime = 0;
    clickAudio.current.play();
  };

  const handleStart = () => {
    playClick();
    setIsFadingOut(true);
    setTimeout(() => {
      setIsShaftFading(true);
    }, 800);
    setTimeout(() => {
      onStart();
    }, 2200);
  };

  const handleOptionsOpen = () => {
    playClick();
    setShowOptions(true);
  };

  const handleOptionsClose = () => {
    playClick();
    setShowOptions(false);
  };

  if (!isVisible) return null;

  const overlayClasses = [
    styles.overlay,
    isFadingIn && styles.fadeIn,
    isFadingOut && styles.fadeOut,
  ].filter(Boolean).join(' ');

  return (
    <div className={overlayClasses}>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <h1 className={styles.title}>The Elevator Pitch</h1>
          <div className={styles.menuContainer}>
            {!showOptions ? (
              <div className={styles.menu}>
                <button className={styles.menuButton} onClick={handleStart}>
                  Start
                </button>
                <button className={styles.menuButton} onClick={handleOptionsOpen}>
                  Options
                </button>
              </div>
            ) : (
              <OptionsPanel onBack={handleOptionsClose} />
            )}
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={`${styles.shaft} ${isShaftFading ? styles.shaftFadeOut : ''}`}>
            <div className={styles.speedLines}></div>
            <div className={styles.elevatorContainer}>
              <img src={titleElevator} alt="" className={styles.elevatorImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
