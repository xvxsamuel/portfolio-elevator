import { useState } from 'react';
import { PortfolioModal, type PortfolioImage } from '../../components/ui/PortfolioModal';
import { useFloorTheme } from '../../hooks/useFloorTheme';

const showreelPortfolio = {
  title: "Video Editing and Motion Graphics: Body Planet Commercial",
  videoId: "F4knMdLnT5k",
  description: `For this project, I explored video editing and motion graphics to create a commercial for Body Planet, a gym focused on wellbeing, community, and personalized experiences. I conducted research on fitness and non-fitness campaigns to understand how successful brands communicate values through rhythm, sound, and visual storytelling. Using Adobe Premiere Pro and After Effects, I combined copyright free footage with UI animations, kinetic typography, and motion design to highlight both the gym's atmosphere and its digital features. I developed a storyboard and shot list to structure the narrative, guiding the viewer through an emotional arc from chaos to calm. Throughout the process, I iteratively tested visual direction, pacing, and sound to ensure coherence and engagement.`,
};

export function useLauraPortfolios() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const { muteTemporarily, restoreFromMute } = useFloorTheme();

  const openShowreel = () => {
    muteTemporarily();
    setShowreelOpen(true);
  };

  const closeShowreel = () => {
    restoreFromMute();
    setShowreelOpen(false);
  };

  const modals = (
    <>
      <PortfolioModal
        isOpen={showreelOpen}
        onClose={closeShowreel}
        title={showreelPortfolio.title}
        videoId={showreelPortfolio.videoId}
      >
        <p>{showreelPortfolio.description}</p>
      </PortfolioModal>
    </>
  );

  return { openShowreel, modals };
}
