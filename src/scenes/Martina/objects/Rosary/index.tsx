import rosary from '../../../../assets/images/interiors/martina/rosary.png';

export function Rosary() {
  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${rosary})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  );
}
