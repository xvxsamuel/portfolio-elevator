import { type ReactNode, type CSSProperties } from 'react';
import styles from './Scene.module.css';

interface SceneProps {
  className?: string;
  backgroundImage: string;
  children?: ReactNode;
  shakePhase?: 'none' | 'building' | 'full' | 'stopping';
  shakeBuildDuration?: number;
  shakeStopDuration?: number;
  isBlurred?: boolean;
  isFadingOut?: boolean;
}

export function Scene({ 
  className = '', 
  backgroundImage, 
  children,
  shakePhase = 'none',
  shakeBuildDuration = 4,
  shakeStopDuration = 3,
  isBlurred = false,
  isFadingOut = false,
}: SceneProps) {
  const sceneClasses = [
    styles.scene,
    isBlurred && styles.blurred,
    isFadingOut && styles.fadingOut,
    shakePhase === 'building' && styles.shakeBuilding,
    shakePhase === 'full' && styles.shakeFull,
    shakePhase === 'stopping' && styles.shakeStopping,
    shakePhase !== 'none' && styles.shaking,
    className,
  ].filter(Boolean).join(' ');

  const contentStyle: CSSProperties = {
    '--shake-build-duration': `${shakeBuildDuration}s`,
    '--shake-stop-duration': `${shakeStopDuration}s`,
  } as CSSProperties;

  return (
    <div className={sceneClasses}>
      <div className={styles.content} style={contentStyle}>
        <div 
          className={styles.background} 
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {children}
      </div>
    </div>
  );
}
