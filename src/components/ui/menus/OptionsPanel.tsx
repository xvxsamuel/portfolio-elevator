import { useState, useEffect } from 'react';
import { useGame } from '../../../context/GameProvider';
import { TextButton } from '../TextButton';
import styles from './OptionsPanel.module.css';

interface OptionsPanelProps {
  onBack: () => void;
}

export function OptionsPanel({ onBack }: OptionsPanelProps) {
  const { parallaxEnabled, setParallaxEnabled, masterVolume, setMasterVolume, debugMode, setDebugMode } = useGame();
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div className={styles.optionsPanel}>
      <div className={styles.optionRow}>
        <span className={styles.optionLabel}>Parallax Effect</span>
        <TextButton 
          variant="light"
          active={parallaxEnabled}
          onClick={() => setParallaxEnabled(!parallaxEnabled)}
        >
          {parallaxEnabled ? 'ON' : 'OFF'}
        </TextButton>
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
        <span className={styles.optionLabel}>Fullscreen</span>
        <TextButton 
          variant="light"
          active={isFullscreen}
          onClick={toggleFullscreen}
        >
          {isFullscreen ? 'ON' : 'OFF'}
        </TextButton>
      </div>

      <div className={styles.optionRow}>
        <span className={styles.optionLabel}>Debug Mode</span>
        <TextButton 
          variant="light"
          active={debugMode}
          onClick={() => setDebugMode(!debugMode)}
        >
          {debugMode ? 'ON' : 'OFF'}
        </TextButton>
      </div>
      
      <button 
        className={styles.backButton} 
        onClick={onBack}
      >
        Back
      </button>
    </div>
  );
}
