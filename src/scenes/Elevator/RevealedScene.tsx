import type { ReactNode } from 'react';
import styles from './ElevatorScene.module.css';

interface RevealedSceneProps {
  backgroundUrl: string | null;
  isZooming: boolean;
  isReturning?: boolean;
  entryOffset?: { x: number; y: number };
  isHidden?: boolean;
  children?: ReactNode;
}

export function RevealedScene({ backgroundUrl, isZooming, isReturning = false, entryOffset = { x: 0, y: 0 }, isHidden = false, children }: RevealedSceneProps) {
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
      <div 
        className={innerClasses} 
        style={{ 
          '--initial-x': `${entryOffset.x}%`,
          '--initial-y': `${entryOffset.y}%`,
        } as React.CSSProperties}
      >
        <img src={backgroundUrl} alt="" className={styles.revealedSceneBg} />
        {children}
      </div>
    </div>
  );
}
