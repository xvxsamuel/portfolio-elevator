import lava from '../../../../assets/images/interiors/martina/lava.png';

export function Lava() {
  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${lava})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  );
}
