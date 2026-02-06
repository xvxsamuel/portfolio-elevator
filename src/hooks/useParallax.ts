import { useRef, useCallback, useEffect } from 'react';

interface UseParallaxOptions {
  maxOffsetX?: number;
  maxOffsetY?: number;
  scale?: number;
  enabled?: boolean;
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { maxOffsetX = 15, maxOffsetY = 10, scale = 1.05, enabled = true } = options;
  const targetRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const currentOffset = useRef({ x: 0, y: 0 });
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentScale = useRef(1);
  const enabledRef = useRef(enabled);
  const scaleRef = useRef(scale);

  enabledRef.current = enabled;
  scaleRef.current = scale;

  useEffect(() => {
    if (!enabled) {
      targetOffset.current = { x: 0, y: 0 };
    }
  }, [enabled]);

  useEffect(() => {
    const updateTransform = () => {
      if (!targetRef.current) {
        rafId.current = requestAnimationFrame(updateTransform);
        return;
      }

      currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.15;
      currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.15;
      
      const targetScale = enabledRef.current ? scaleRef.current : 1;
      currentScale.current += (targetScale - currentScale.current) * 0.15;

      const isAtRest = !enabledRef.current && 
        Math.abs(currentOffset.current.x) < 0.01 && 
        Math.abs(currentOffset.current.y) < 0.01 &&
        Math.abs(currentScale.current - 1) < 0.001;

      if (isAtRest) {
        currentOffset.current = { x: 0, y: 0 };
        currentScale.current = 1;
        targetRef.current.style.transform = '';
      } else {
        targetRef.current.style.transform = `scale(${currentScale.current}) translate(${currentOffset.current.x}px, ${currentOffset.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(updateTransform);
    };

    rafId.current = requestAnimationFrame(updateTransform);
    
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabledRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetOffset.current = { x: x * -maxOffsetX, y: y * -maxOffsetY };
  }, [maxOffsetX, maxOffsetY]);

  return { handleMouseMove, targetRef };
}
