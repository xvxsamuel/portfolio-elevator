import { useState, useEffect } from 'react';
import { Scene } from '../../components/Scene';
import { BackArrow } from '../../components/ui/BackArrow';
import { VideoModal } from '../../components/ui/VideoModal';
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
      <VideoModal
        isOpen={videoOpen}
        onClose={handleVideoClose}
        videoId="F4knMdLnT5k"
      />
    </Scene>
  );
}
