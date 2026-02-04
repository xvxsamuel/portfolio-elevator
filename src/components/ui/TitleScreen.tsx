import { useState, useRef } from 'react';
import { useGame } from '../../context/GameProvider';
import liftClickSound from '../../assets/audio/elevator/lift_click.mp3';
import titleElevator from '../../assets/images/title/title_elevator.png';
import styles from './TitleScreen.module.css';

interface TitleScreenProps {
  isVisible: boolean;
  onStart: () => void;
}

export function TitleScreen({ isVisible, onStart }: TitleScreenProps) {
  const { parallaxEnabled, setParallaxEnabled, masterVolume, setMasterVolume, debugMode, setDebugMode } = useGame();
  const [showOptions, setShowOptions] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isShaftFading, setIsShaftFading] = useState(false);
  const clickAudio = useRef(new Audio(liftClickSound));

  const playClick = () => {
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

  return (
    <div className={`${styles.overlay} ${isFadingOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <h1 className={styles.title}>The Elevator</h1>
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
              <div className={styles.optionsPanel}>
                <div className={styles.optionRow}>
                  <span className={styles.optionLabel}>Parallax Effect</span>
                  <button 
                    className={`${styles.toggle} ${parallaxEnabled ? styles.toggleOn : ''}`}
                    onClick={() => setParallaxEnabled(!parallaxEnabled)}
                  >
                    {parallaxEnabled ? 'ON' : 'OFF'}
                  </button>
                </div>
                
                <div className={styles.optionRow}>
                  <span className={styles.optionLabel}>Volume</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={masterVolume}
                    onChange={(e) => setMasterVolume(Number(e.target.value))}
                    className={styles.slider}
                  />
                  <span className={styles.volumeValue}>{masterVolume}%</span>
                </div>

                <div className={styles.optionRow}>
                  <span className={styles.optionLabel}>Debug Mode</span>
                  <button 
                    className={`${styles.toggle} ${debugMode ? styles.toggleOn : ''}`}
                    onClick={() => setDebugMode(!debugMode)}
                  >
                    {debugMode ? 'ON' : 'OFF'}
                  </button>
                </div>
                
                <button 
                  className={styles.backButton} 
                  onClick={handleOptionsClose}
                >
                  Back
                </button>
              </div>
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
