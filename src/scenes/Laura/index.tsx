import { useState, useEffect } from 'react';
import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
import { LauraHotspots } from './hotspots';
import { useLauraPortfolios } from './portfolio';
import lauraBg from '../../assets/images/interiors/laura/main.png';

interface LauraSceneProps {
  onBack?: () => void;
}

export function LauraScene({ onBack }: LauraSceneProps) {
  const [arrowVisible, setArrowVisible] = useState(false);
  const { openShowreel, openPolaroid, openFitness, openMagazine, modals } = useLauraPortfolios();

  useEffect(() => {
    const timer = setTimeout(() => setArrowVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Scene className="laura-scene" backgroundImage={lauraBg}>
      <LauraHotspots 
        onLaptopClick={openShowreel} 
        onCameraClick={openPolaroid}
        onFitnessClick={openFitness}
        onMagazineClick={openMagazine}
      />
      {onBack && (
        <BackArrow 
          onClick={onBack}
          visible={arrowVisible}
          style={{ bottom: '6%', left: '75%', transform: 'translateX(-50%) perspective(200px) rotateX(-60deg)' }}
          rotation={{ z: -10 }}
        />
      )}
      {modals}
    </Scene>
  );
}
