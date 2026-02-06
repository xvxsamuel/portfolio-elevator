import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './GameContainer.module.css';
import { useParallax } from '../hooks/useParallax';
import { useGame } from '../context/GameProvider';

interface GameContainerProps {
  children: ReactNode;
  sceneContent?: ReactNode;
  className?: string;
}

export function GameContainer({ children, sceneContent, className }: GameContainerProps) {
  const { parallaxEnabled, modalOpen } = useGame();
  const { handleMouseMove, targetRef } = useParallax({ maxOffsetX: 12, maxOffsetY: 8, scale: 1.03, enabled: parallaxEnabled && !modalOpen });

  const parallaxClasses = clsx(styles.parallaxLayer, modalOpen && styles.blurred);

  return (
    <div className={clsx(styles.wrapper, className)} onMouseMove={handleMouseMove}>
      <div className={styles.container}>
        {sceneContent && (
          <div ref={targetRef} className={parallaxClasses}>
            {sceneContent}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
