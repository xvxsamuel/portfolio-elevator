import { useGame } from '../../context/GameProvider';
import { getPreloadedAudio } from '../../hooks/usePreloader';
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
  const { showDialogue, playerName, masterVolume, showHotspots } = useGame();

  const handleClick = () => {
    if (sound) {
      const audio = getPreloadedAudio(sound);
      audio.volume = masterVolume / 100;
      audio.currentTime = 0;
      audio.play();
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
      className={`${styles.hotspot} ${showHotspots ? styles.debug : ''}`}
      onClick={handleClick}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
    >
      {showHotspots && label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
