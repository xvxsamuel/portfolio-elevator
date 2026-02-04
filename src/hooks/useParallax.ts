import { useState, useCallback } from 'react';

interface ParallaxOffset {
  x: number;
  y: number;
}

interface UseParallaxOptions {
  maxOffsetX?: number;
  maxOffsetY?: number;
  scale?: number;
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { maxOffsetX = 15, maxOffsetY = 10, scale = 1.05 } = options;
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: x * -maxOffsetX, y: y * -maxOffsetY });
  }, [maxOffsetX, maxOffsetY]);

  const parallaxStyle: React.CSSProperties = {
    transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
    transition: 'transform 0.1s ease-out',
  };

  return { handleMouseMove, parallaxStyle, offset };
}
