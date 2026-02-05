import { useState, useEffect, useCallback } from 'react';
import catOpen from '../../../../assets/images/interiors/samuel/cat.png';
import catBlink from '../../../../assets/images/interiors/samuel/catBlink.png';

export function Cat() {
  const [isBlinking, setIsBlinking] = useState(false);

  const scheduleNextBlink = useCallback(() => {
    const delay = 2000 + Math.random() * 4000;
    return setTimeout(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        scheduleNextBlink();
      }, 150 + Math.random() * 100);
    }, delay);
  }, []);

  useEffect(() => {
    const timer = scheduleNextBlink();
    return () => clearTimeout(timer);
  }, [scheduleNextBlink]);

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
    transition: 'opacity 0.05s ease',
  };

  return (
    <>
      <div style={{ ...baseStyle, backgroundImage: `url(${catOpen})`, opacity: isBlinking ? 0 : 1 }} />
      <div style={{ ...baseStyle, backgroundImage: `url(${catBlink})`, opacity: isBlinking ? 1 : 0 }} />
    </>
  );
}
