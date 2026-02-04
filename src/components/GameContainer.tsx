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
  const { parallaxEnabled } = useGame();
  const { handleMouseMove, parallaxStyle } = useParallax({ maxOffsetX: 12, maxOffsetY: 8, scale: 1.03 });

  return (
    <div className={clsx(styles.wrapper, className)} onMouseMove={parallaxEnabled ? handleMouseMove : undefined}>
      <div className={styles.container}>
        {sceneContent && (
          <div className={styles.parallaxLayer} style={parallaxEnabled ? parallaxStyle : undefined}>
            {sceneContent}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
