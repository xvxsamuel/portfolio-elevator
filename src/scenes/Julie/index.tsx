import { useState, useEffect } from 'react';
import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
import { FloorOverlays } from '../Elevator/FloorOverlays';
import { JulieHotspots } from './hotspots';
import julieBg from '../../assets/images/interiors/julie/main.png';

interface JulieSceneProps {
  onBack?: () => void;
}

export function JulieScene({ onBack }: JulieSceneProps) {
  const [arrowVisible, setArrowVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setArrowVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Scene className="julie-scene" backgroundImage={julieBg} entryPoint="right">
      <FloorOverlays floor={4} />
      <JulieHotspots />
      {onBack && (
        <BackArrow 
          onClick={onBack}
          visible={arrowVisible}
          style={{ bottom: '5%', left: '90%', transform: 'translateX(-50%) perspective(200px) rotateX(-60deg)' }}
          rotation={{ z: -20 }}
        />
      )}
    </Scene>
  );
}
