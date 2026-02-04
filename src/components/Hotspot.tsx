import { type CSSProperties } from 'react';
import { useGame } from '../context/GameProvider';
import styles from './Hotspot.module.css';

interface HotspotProps {
  x: number;
  y: number;
  width: number;
  height: number;
  onClick?: () => void;
  label?: string;
}

export function Hotspot({ x, y, width, height, onClick, label }: HotspotProps) {
  const { debugMode } = useGame();
  const style: CSSProperties = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    width: `${width}%`,
    height: `${height}%`,
    cursor: onClick ? 'pointer' : 'default',
  };

  return (
    <div 
      className={`${styles.hotspot} ${debugMode ? styles.debug : ''}`}
      style={style}
      onClick={onClick}
    >
      {debugMode && label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
