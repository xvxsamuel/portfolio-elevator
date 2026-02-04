import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
import samuelBg from '../../assets/images/interiors/samuel/main.png';

interface SamuelSceneProps {
  onBack?: () => void;
}

export function SamuelScene({ onBack }: SamuelSceneProps) {
  return (
    <Scene className="samuel-scene" backgroundImage={samuelBg} entryPoint="right">
      {onBack && (
        <BackArrow 
          onClick={onBack}
          style={{ bottom: '3%', left: '80%', transform: 'translateX(-50%) perspective(200px) rotateX(-60deg)' }}
        />
      )}
    </Scene>
  );
}
