import { useState, useEffect } from 'react';
import note1 from '../../../../assets/images/interiors/laura/note1.png';
import note2 from '../../../../assets/images/interiors/laura/Music note 2.png';
import note3 from '../../../../assets/images/interiors/laura/Music note 3.png';
import note4 from '../../../../assets/images/interiors/laura/Music note 4.png';
import note5 from '../../../../assets/images/interiors/laura/Music note 5.png';

const notes = [note1, note2, note3, note4, note5];

interface NotesProps {
  interval?: number;
}

export function Notes({ interval = 400 }: NotesProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame(f => (f + 1) % notes.length), interval);
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
    transition: 'opacity 0.15s ease',
  };

  return (
    <>
      {notes.map((note, i) => (
        <div
          key={i}
          style={{
            ...baseStyle,
            backgroundImage: `url(${note})`,
            opacity: frame === i ? 1 : 0,
          }}
        />
      ))}
    </>
  );
}
