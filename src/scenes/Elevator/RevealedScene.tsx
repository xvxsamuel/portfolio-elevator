import styles from './ElevatorScene.module.css';
import type { EntryPoint } from '../../components/Scene';

interface RevealedSceneProps {
  backgroundUrl: string | null;
  isZooming: boolean;
  entryPoint?: EntryPoint;
}

const ENTRY_POSITIONS: Record<EntryPoint, string> = {
  center: 'center',
  left: '0% center',
  right: '100% 100%',
  top: 'center 0%',
  bottom: 'center 100%',
};

export function RevealedScene({ backgroundUrl, isZooming, entryPoint = 'center' }: RevealedSceneProps) {
  if (!backgroundUrl) return null;
  
  return (
    <div 
      className={`${styles.revealedScene} ${isZooming ? styles.revealedSceneZooming : ''}`}
      style={{ 
        backgroundImage: `url(${backgroundUrl})`,
        backgroundPosition: ENTRY_POSITIONS[entryPoint],
      }}
    />
  );
}
