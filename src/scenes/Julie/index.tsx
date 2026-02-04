import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
import julieBg from '../../assets/images/interiors/julie/main.png';

interface JulieSceneProps {
  onBack?: () => void;
}

export function JulieScene({ onBack }: JulieSceneProps) {
  return (
    <Scene className="julie-scene" backgroundImage={julieBg} entryPoint="right">
      {onBack && (
        <BackArrow 
          onClick={onBack}
          style={{ bottom: '3%', left: '90%', transform: 'translateX(-50%) perspective(200px) rotateX(-60deg)' }}
        />
      )}
    </Scene>
  );
}
