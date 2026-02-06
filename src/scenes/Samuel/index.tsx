import { useState, useEffect } from 'react';
import { Scene } from '../../components/Scene';
import { Arrow } from '../../components/ui/Arrow';
import { SamuelHotspots } from './hotspots';
import samuelBg from '../../assets/images/interiors/samuel/main.png';

interface SamuelSceneProps {
  onBack?: () => void;
}

export function SamuelScene({ onBack }: SamuelSceneProps) {
  const [arrowVisible, setArrowVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setArrowVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Scene className="samuel-scene" backgroundImage={samuelBg}>
      <SamuelHotspots />

      {onBack && (
        <Arrow 
          onClick={onBack}
          visible={arrowVisible}
          pulse
          perspective
          style={{ bottom: '5%', left: '73%', transform: 'translateX(-50%) perspective(200px) rotateX(-60deg) scale(1.5)' }}
          rotation={{ z: 5 }}
        />
      )}
    </Scene>
  );
}
