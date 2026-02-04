import { type CSSProperties } from 'react';
import { DEBUG_HOTSPOTS } from '../config';
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
  const debug = DEBUG_HOTSPOTS;
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
      className={`${styles.hotspot} ${debug ? styles.debug : ''}`}
      style={style}
      onClick={onClick}
    >
      {debug && label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
