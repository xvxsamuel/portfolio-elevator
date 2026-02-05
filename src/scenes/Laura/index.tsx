import { useState, useEffect } from 'react';
import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
import { PortfolioModal } from '../../components/ui/PortfolioModal';
import { LauraHotspots } from './hotspots';
import { useFloorTheme } from '../../hooks/useFloorTheme';
import lauraBg from '../../assets/images/interiors/laura/main.png';

interface LauraSceneProps {
  onBack?: () => void;
}

export function LauraScene({ onBack }: LauraSceneProps) {
  const [arrowVisible, setArrowVisible] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const { muteTemporarily, restoreFromMute } = useFloorTheme();

  useEffect(() => {
    const timer = setTimeout(() => setArrowVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoOpen = () => {
    muteTemporarily();
    setVideoOpen(true);
  };

  const handleVideoClose = () => {
    restoreFromMute();
    setVideoOpen(false);
  };

  return (
    <Scene className="laura-scene" backgroundImage={lauraBg}>
      <LauraHotspots onLaptopClick={handleVideoOpen} />
      {onBack && (
        <BackArrow 
          onClick={onBack}
          visible={arrowVisible}
          style={{ bottom: '6%', left: '75%', transform: 'translateX(-50%) perspective(200px) rotateX(-60deg)' }}
          rotation={{ z: -10 }}
        />
      )}
      <PortfolioModal
        isOpen={videoOpen}
        onClose={handleVideoClose}
        title="Laura's Showreel"
        videoId="F4knMdLnT5k"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </PortfolioModal>
    </Scene>
  );
}
