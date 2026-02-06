import { useState, useEffect, useRef } from 'react';
import fish1 from '../../../../assets/images/interiors/samuel/fish1.png';
import fish2 from '../../../../assets/images/interiors/samuel/fish2.png';

interface FishProps {
  isAnimating: boolean;
}

export function Fish({ isAnimating }: FishProps) {
  const [frame, setFrame] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isAnimating) {
      intervalRef.current = window.setInterval(() => {
        setFrame(f => (f + 1) % 2);
      }, 200);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setFrame(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAnimating]);

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    pointerEvents: 'none',
    zIndex: 3,
  };

  return (
    <>
      {frame === 0 && <div style={{ ...baseStyle, backgroundImage: `url(${fish1})` }} />}
      {frame === 1 && <div style={{ ...baseStyle, backgroundImage: `url(${fish2})` }} />}
    </>
  );
}
