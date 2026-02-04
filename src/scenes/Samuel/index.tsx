import { useState, useEffect } from 'react';
import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
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
    <Scene className="samuel-scene" backgroundImage={samuelBg} entryPoint="right">
      {onBack && (
        <BackArrow 
          onClick={onBack}
          visible={arrowVisible}
          style={{ bottom: '3%', left: '80%', transform: 'translateX(-50%) perspective(200px) rotateX(-60deg)' }}
          rotation={{ z: -10 }}
        />
      )}
    </Scene>
  );
}
