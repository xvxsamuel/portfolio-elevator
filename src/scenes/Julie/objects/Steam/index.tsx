import { useState, useEffect } from 'react';
import steam1 from '../../../../assets/images/interiors/julie/steam1.png';
import steam2 from '../../../../assets/images/interiors/julie/steam2.png';

interface SteamProps {
  interval?: number;
}

export function Steam({ interval = 500 }: SteamProps) {
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
      <div style={{ ...baseStyle, backgroundImage: `url(${steam1})`, opacity: frame === 0 ? 1 : 0 }} />
      <div style={{ ...baseStyle, backgroundImage: `url(${steam2})`, opacity: frame === 1 ? 1 : 0 }} />
    </>
  );
}
