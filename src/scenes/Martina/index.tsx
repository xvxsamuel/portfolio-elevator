import { useState, useEffect } from 'react';
import { Scene } from '../../components/Scene';
import { Arrow } from '../../components/ui/Arrow';
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
      <MartinaHotspots />

      {onBack && (
        <Arrow 
          onClick={onBack}
          visible={arrowVisible}
          pulse
          perspective
          style={{ bottom: '5%', left: '70%', transform: 'translateX(-50%) perspective(200px) rotateX(-60deg) scale(1.5)' }}
          rotation={{ z: -10 }}
        />
      )}
    </Scene>
  );
}
