import styles from './ElevatorScene.module.css';

interface RevealedSceneProps {
  backgroundUrl: string | null;
  isZooming: boolean;
}

export function RevealedScene({ backgroundUrl, isZooming }: RevealedSceneProps) {
  if (!backgroundUrl) return null;
  
  return (
    <div 
      className={`${styles.revealedScene} ${isZooming ? styles.revealedSceneZooming : ''}`}
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    />
  );
}
