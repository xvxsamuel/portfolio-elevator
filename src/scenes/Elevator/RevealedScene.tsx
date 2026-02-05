import type { ReactNode } from 'react';
import styles from './ElevatorScene.module.css';

interface RevealedSceneProps {
  backgroundUrl: string | null;
  isZooming: boolean;
  isReturning?: boolean;
  isHidden?: boolean;
  children?: ReactNode;
}

export function RevealedScene({ backgroundUrl, isZooming, isReturning = false, isHidden = false, children }: RevealedSceneProps) {
  if (!backgroundUrl) return null;

  const containerClasses = [
    styles.revealedScene,
    isZooming && styles.revealedSceneZooming,
    isReturning && styles.revealedSceneReturning,
    isHidden && styles.revealedSceneHidden,
  ].filter(Boolean).join(' ');

  const innerClasses = [
    styles.revealedSceneInner,
    isZooming && styles.revealedSceneInnerZooming,
    isReturning && styles.revealedSceneInnerReturning,
  ].filter(Boolean).join(' ');
  
  return (
    <div className={containerClasses}>
      <div className={innerClasses}>
        <img src={backgroundUrl} alt="" className={styles.revealedSceneBg} />
        {children}
      </div>
    </div>
  );
}
