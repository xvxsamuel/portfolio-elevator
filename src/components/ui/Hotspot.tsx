import { useRef } from 'react';
import { useGame } from '../../context/GameProvider';
import styles from './Hotspot.module.css';

interface HotspotProps {
  x: number;
  y: number;
  width: number;
  height: number;
  onClick?: () => void;
  dialogue?: string;
  speaker?: string;
  sound?: string;
  label?: string;
  onDialogueComplete?: () => void;
}

export function Hotspot({ x, y, width, height, onClick, dialogue, speaker, sound, label, onDialogueComplete }: HotspotProps) {
  const { showDialogue, playerName, masterVolume, debugMode } = useGame();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (sound) {
      if (!audioRef.current) {
        audioRef.current = new Audio(sound);
      }
      audioRef.current.volume = masterVolume / 100;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    
    if (dialogue) {
      showDialogue(dialogue, speaker || playerName, onDialogueComplete);
    } else {
      onDialogueComplete?.();
    }
    
    onClick?.();
  };

  return (
    <div 
      className={`${styles.hotspot} ${debugMode ? styles.debug : ''}`}
      onClick={handleClick}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
    >
      {debugMode && label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
