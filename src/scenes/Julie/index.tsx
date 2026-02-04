import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
import julieBg from '../../assets/images/interiors/julie/main.png';

interface JulieSceneProps {
  onBack?: () => void;
}

export function JulieScene({ onBack }: JulieSceneProps) {
  return (
    <Scene className="julie-scene" backgroundImage={julieBg} entryPoint="right">
      {onBack && <BackArrow onClick={onBack} />}
    </Scene>
  );
}
