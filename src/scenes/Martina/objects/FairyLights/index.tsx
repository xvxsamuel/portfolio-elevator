import { useState, useEffect } from 'react';
import fairy1 from '../../../../assets/images/interiors/martina/fairy1.png';
import fairy2 from '../../../../assets/images/interiors/martina/fairy2.png';

interface FairyLightsProps {
  interval?: number;
}

export function FairyLights({ interval = 500 }: FairyLightsProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame(f => (f + 1) % 2), interval);
    return () => clearInterval(timer);
  }, [interval]);

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
      <div style={{ ...baseStyle, backgroundImage: `url(${fairy1})`, opacity: frame === 0 ? 1 : 0 }} />
      <div style={{ ...baseStyle, backgroundImage: `url(${fairy2})`, opacity: frame === 1 ? 1 : 0 }} />
    </>
  );
}
