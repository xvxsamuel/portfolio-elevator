import { useState, useEffect, useRef } from 'react';
import { useGame } from '../../../context/GameProvider';
import { OptionsPanel } from './OptionsPanel';
import { getPreloadedAudio } from '../../../hooks/usePreloader';
import liftClickSound from '../../../assets/audio/elevator/lift_click.mp3';
import styles from './PauseMenu.module.css';

interface PauseMenuProps {
  isVisible: boolean;
  onResume: () => void;
  onExitToTitle: () => void;
}

export function PauseMenu({ isVisible, onResume, onExitToTitle }: PauseMenuProps) {
  const { masterVolume } = useGame();
  const [showOptions, setShowOptions] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const clickAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setShowOptions(false);
      setShowConfirm(false);
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

  const handleResume = () => {
    playClick();
    onResume();
  };

  const handleOptionsOpen = () => {
    playClick();
    setShowOptions(true);
  };

  const handleOptionsClose = () => {
    playClick();
    setShowOptions(false);
  };

  const handleExitToTitle = () => {
    playClick();
    setShowConfirm(true);
  };

  const handleConfirmExit = () => {
    playClick();
    onExitToTitle();
  };

  const handleCancelExit = () => {
    playClick();
    setShowConfirm(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h1 className={styles.title}>Paused</h1>
        <div className={styles.menuContainer}>
          {showConfirm ? (
            <div className={styles.confirmPanel}>
              <p className={styles.confirmText}>All progress will be lost. Are you sure?</p>
              <div className={styles.confirmButtons}>
                <button className={styles.menuButton} onClick={handleConfirmExit}>
                  Yes
                </button>
                <button className={styles.menuButton} onClick={handleCancelExit}>
                  No
                </button>
              </div>
            </div>
          ) : !showOptions ? (
            <div className={styles.menu}>
              <button className={styles.menuButton} onClick={handleResume}>
                Resume
              </button>
              <button className={styles.menuButton} onClick={handleOptionsOpen}>
                Options
              </button>
              <button className={styles.menuButton} onClick={handleExitToTitle}>
                Exit to Title
              </button>
            </div>
          ) : (
            <OptionsPanel onBack={handleOptionsClose} />
          )}
        </div>
      </div>
    </div>
  );
}
