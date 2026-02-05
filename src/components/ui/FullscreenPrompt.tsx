import { useState } from 'react';
import { motion } from 'framer-motion';
import { TextButton } from './TextButton';
import styles from './FullscreenPrompt.module.css';

interface FullscreenPromptProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function FullscreenPrompt({ isVisible, onComplete }: FullscreenPromptProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleChoice = (enableFullscreen: boolean) => {
    localStorage.setItem('fullscreenPromptShown', 'true');
    
    if (enableFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className={`${styles.overlay} ${isFadingOut ? styles.fadeOut : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>Would you like to use fullscreen?</h2>
        <p className={styles.description}>
          Highly recommended for the best experience.
        </p>
        <div className={styles.buttons}>
          <TextButton onClick={() => handleChoice(true)}>Yes</TextButton>
          <TextButton onClick={() => handleChoice(false)}>No</TextButton>
        </div>
        <p className={styles.hint}>You can change this later in settings</p>
      </div>
    </motion.div>
  );
}
