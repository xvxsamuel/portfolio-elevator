import mask from '../../../../assets/images/interiors/samuel/mask.png';

export function Mask() {
  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${mask})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  );
}
