import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
import martinaBg from '../../assets/images/interiors/martina/main.png';

interface MartinaSceneProps {
  onBack?: () => void;
}

export function MartinaScene({ onBack }: MartinaSceneProps) {
  return (
    <Scene className="martina-scene" backgroundImage={martinaBg} entryPoint="right">
      {onBack && (
        <BackArrow 
          onClick={onBack}
          style={{ bottom: '5%', left: '70%', transform: 'translateX(-50%) perspective(200px) rotateX(-60deg)' }}
        />
      )}
    </Scene>
  );
}
