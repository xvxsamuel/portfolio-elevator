import { useState, useEffect, type ReactNode, type CSSProperties } from 'react';
import styles from './Scene.module.css';

export type EntryPoint = 'center' | 'left' | 'right' | 'top' | 'bottom';

const ENTRY_POSITIONS: Record<EntryPoint, string> = {
  center: 'center',
  left: '30% center',
  right: '70% center',
  top: 'center 30%',
  bottom: 'center 70%',
};

interface SceneProps {
  className?: string;
  backgroundImage: string;
  children?: ReactNode;
  shakePhase?: 'none' | 'building' | 'full' | 'stopping';
  shakeBuildDuration?: number;
  shakeStopDuration?: number;
  isBlurred?: boolean;
  isFadingOut?: boolean;
  entryPoint?: EntryPoint;
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
  entryPoint = 'center',
}: SceneProps) {
  const [isEntering, setIsEntering] = useState(entryPoint !== 'center');

  useEffect(() => {
    if (entryPoint !== 'center') {
      const timer = setTimeout(() => setIsEntering(false), 50);
      return () => clearTimeout(timer);
    }
  }, [entryPoint]);

  const sceneClasses = [
    styles.scene,
    isBlurred && styles.blurred,
    isFadingOut && styles.fadingOut,
    shakePhase === 'building' && styles.shakeBuilding,
    shakePhase === 'full' && styles.shakeFull,
    shakePhase === 'stopping' && styles.shakeStopping,
    shakePhase !== 'none' && styles.shaking,
    entryPoint !== 'center' && styles.hasEntryAnimation,
    className,
  ].filter(Boolean).join(' ');

  const contentStyle: CSSProperties = {
    '--shake-build-duration': `${shakeBuildDuration}s`,
    '--shake-stop-duration': `${shakeStopDuration}s`,
  } as CSSProperties;

  const backgroundPosition = isEntering ? ENTRY_POSITIONS[entryPoint] : 'center';

  return (
    <div className={sceneClasses}>
      <div className={styles.content} style={contentStyle}>
        <div 
          className={styles.background} 
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition,
          }}
        />
        {children}
      </div>
    </div>
  );
}
