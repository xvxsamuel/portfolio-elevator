import styles from './ElevatorScene.module.css';

interface RevealedSceneProps {
  backgroundUrl: string | null;
  isZooming: boolean;
  isReturning?: boolean;
  entryPosition?: string;
}

export function RevealedScene({ backgroundUrl, isZooming, isReturning = false, entryPosition = 'center' }: RevealedSceneProps) {
  if (!backgroundUrl) return null;
  let bgPosition = entryPosition;
  if (isZooming) {
    bgPosition = 'center';
  }
  
  return (
    <div 
      className={`${styles.revealedScene} ${isZooming ? styles.revealedSceneZooming : ''} ${isReturning ? styles.revealedSceneReturning : ''}`}
      style={{ 
        backgroundImage: `url(${backgroundUrl})`,
        backgroundPosition: bgPosition,
      }}
    />
  );
}
