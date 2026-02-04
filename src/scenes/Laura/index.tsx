import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
import lauraBg from '../../assets/images/interiors/laura/main.png';

interface LauraSceneProps {
  onBack?: () => void;
}

export function LauraScene({ onBack }: LauraSceneProps) {
  return (
    <Scene className="laura-scene" backgroundImage={lauraBg}>
      {onBack && (
        <BackArrow 
          onClick={onBack}
          style={{ bottom: '5%', left: '75%', transform: 'translateX(-50%) perspective(200px) rotateX(-60deg)' }}
        />
      )}
    </Scene>
  );
}
