import recordClosed from '../../../../assets/images/interiors/samuel/recordPlayerClosed.png';
import recordOpen from '../../../../assets/images/interiors/samuel/recordPlayerOpen.png';
import needle1 from '../../../../assets/images/interiors/samuel/needle1.png';
import needle2 from '../../../../assets/images/interiors/samuel/needle2.png';

interface RecordPlayerProps {
  isOpen: boolean;
}

export function RecordPlayer({ isOpen }: RecordPlayerProps) {
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
    transition: 'opacity 0.2s ease',
  };

  return (
    <>
      <div style={{ ...baseStyle, backgroundImage: `url(${recordClosed})`, opacity: isOpen ? 0 : 1 }} />
      <div style={{ ...baseStyle, backgroundImage: `url(${recordOpen})`, opacity: isOpen ? 1 : 0 }} />
      <div style={{ ...baseStyle, backgroundImage: `url(${needle1})`, opacity: isOpen ? 0 : 1, zIndex: 4 }} />
      <div style={{ ...baseStyle, backgroundImage: `url(${needle2})`, opacity: isOpen ? 1 : 0, zIndex: 4 }} />
    </>
  );
}
