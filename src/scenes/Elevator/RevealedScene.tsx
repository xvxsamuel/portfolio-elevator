import type { ReactNode } from 'react';
import styles from './ElevatorScene.module.css';

interface RevealedSceneProps {
  backgroundUrl: string | null;
  isZooming: boolean;
  isReturning?: boolean;
  isHidden?: boolean;
  isEndingWhite?: boolean;
  children?: ReactNode;
}

export function RevealedScene({ backgroundUrl, isZooming, isReturning = false, isHidden = false, isEndingWhite = false, children }: RevealedSceneProps) {
  if (!backgroundUrl && !isEndingWhite) return null;

  const containerClasses = [
    styles.revealedScene,
    isZooming && !isEndingWhite && styles.revealedSceneZooming,
    isEndingWhite && styles.revealedSceneZoomingEnding,
    isReturning && styles.revealedSceneReturning,
    isHidden && styles.revealedSceneHidden,
    isEndingWhite && styles.revealedSceneWhite,
  ].filter(Boolean).join(' ');

  const innerClasses = [
    styles.revealedSceneInner,
    isEndingWhite && styles.revealedSceneWhiteBg,
  ].filter(Boolean).join(' ');
  
  return (
    <div className={containerClasses}>
      <div className={innerClasses}>
        {!isEndingWhite && (
          <img src={backgroundUrl!} alt="" className={styles.revealedSceneBg} />
        )}
        {children}
      </div>
    </div>
  );
}
