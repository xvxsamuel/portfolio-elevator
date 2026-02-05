import clockLine1 from '../../../../assets/images/interiors/julie/clockLine1.png';
import clockLine2 from '../../../../assets/images/interiors/julie/clockLine2.png';

export function ClockLines() {
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
      <div style={{ ...baseStyle, backgroundImage: `url(${clockLine1})` }} />
      <div style={{ ...baseStyle, backgroundImage: `url(${clockLine2})` }} />
    </>
  );
}
