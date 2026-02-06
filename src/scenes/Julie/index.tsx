import { useState, useEffect } from 'react';
import { Scene } from '../../components/Scene';
import { Arrow } from '../../components/ui/Arrow';
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
    <Scene className="julie-scene" backgroundImage={julieBg}>
      <JulieHotspots />
      {onBack && (
        <Arrow 
          onClick={onBack}
          visible={arrowVisible}
          pulse
          perspective
          style={{ bottom: '5%', left: '90%', transform: 'translateX(-50%) perspective(200px) rotateX(-60deg) scale(1.5)' }}
          rotation={{ z: -20 }}
        />
      )}
    </Scene>
  );
}
