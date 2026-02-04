import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
import samuelBg from '../../assets/images/interiors/samuel/main.png';

interface SamuelSceneProps {
  onBack?: () => void;
}

export function SamuelScene({ onBack }: SamuelSceneProps) {
  return (
    <Scene className="samuel-scene" backgroundImage={samuelBg}>
      {onBack && <BackArrow onClick={onBack} />}
    </Scene>
  );
}
