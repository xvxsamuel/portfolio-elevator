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
        title="Video Editing and Motion Graphics: Body Planet Commercial"
        videoId="F4knMdLnT5k"
      >
        <p>
          For this project, I explored video editing and motion graphics to create a commercial for Body
          Planet, a gym focused on wellbeing, community, and personalized experiences. I conducted
          research on fitness and non-fitness campaigns to understand how successful brands
          communicate values through rhythm, sound, and visual storytelling. Using Adobe Premiere Pro
          and After Effects, I combined copyright free footage with UI animations, kinetic typography, and
          motion design to highlight both the gym's atmosphere and its digital features. I developed a
          storyboard and shot list to structure the narrative, guiding the viewer through an emotional arc
          from chaos to calm. Throughout the process, I iteratively tested visual direction, pacing, and
          sound to ensure coherence and engagement.
        </p>
      </PortfolioModal>
    </Scene>
  );
}
