import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
import lauraBg from '../../assets/images/interiors/laura/main.png';

interface LauraSceneProps {
  onBack?: () => void;
}

export function LauraScene({ onBack }: LauraSceneProps) {
  return (
    <Scene className="laura-scene" backgroundImage={lauraBg}>
      {onBack && <BackArrow onClick={onBack} />}
    </Scene>
  );
}
