import { useState, useEffect } from 'react';
import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
import { FloorOverlays } from '../Elevator/FloorOverlays';
import { MartinaHotspots } from './hotspots';
import martinaBg from '../../assets/images/interiors/martina/main.png';

interface MartinaSceneProps {
  onBack?: () => void;
}

export function MartinaScene({ onBack }: MartinaSceneProps) {
  const [arrowVisible, setArrowVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setArrowVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Scene className="martina-scene" backgroundImage={martinaBg}>
      <FloorOverlays floor={1} />
      <MartinaHotspots />

      {onBack && (
        <BackArrow 
          onClick={onBack}
          visible={arrowVisible}
          style={{ bottom: '5%', left: '70%', transform: 'translateX(-50%) perspective(200px) rotateX(-60deg)' }}
          rotation={{ z: -10 }}
        />
      )}
    </Scene>
  );
}
