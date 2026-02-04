import styles from './ElevatorScene.module.css';

interface RevealedSceneProps {
  backgroundUrl: string | null;
  isZooming: boolean;
  isReturning?: boolean;
  entryPosition?: string;
  isHidden?: boolean;
}

export function RevealedScene({ backgroundUrl, isZooming, isReturning = false, entryPosition = 'center', isHidden = false }: RevealedSceneProps) {
  if (!backgroundUrl) return null;
  let bgPosition = entryPosition;
  if (isZooming) {
    bgPosition = 'center';
  }
  
  return (
    <div 
      className={`${styles.revealedScene} ${isZooming ? styles.revealedSceneZooming : ''} ${isReturning ? styles.revealedSceneReturning : ''} ${isHidden ? styles.revealedSceneHidden : ''}`}
      style={{ 
        backgroundImage: `url(${backgroundUrl})`,
        backgroundPosition: bgPosition,
      }}
    />
  );
}
