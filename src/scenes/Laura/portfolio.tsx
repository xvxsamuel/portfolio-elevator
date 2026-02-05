import { useState } from 'react';
import { PortfolioModal } from '../../components/ui/PortfolioModal';
import { PolaroidModal } from './objects/PolaroidModal';
import { useInventory } from '../../hooks/useInventory';
import magazinePdf from '../../assets/images/interiors/laura/portfolio/Magazine_Laura.pdf';

const showreelPortfolio = {
  title: "Video Editing and Motion Graphics: Body Planet Commercial",
  videoId: "F4knMdLnT5k",
  description: `For this project, I explored video editing and motion graphics to create a commercial for Body Planet, a gym focused on wellbeing, community, and personalized experiences. I conducted research on fitness and non-fitness campaigns to understand how successful brands communicate values through rhythm, sound, and visual storytelling. Using Adobe Premiere Pro and After Effects, I combined copyright free footage with UI animations, kinetic typography, and motion design to highlight both the gym's atmosphere and its digital features. I developed a storyboard and shot list to structure the narrative, guiding the viewer through an emotional arc from chaos to calm. Throughout the process, I iteratively tested visual direction, pacing, and sound to ensure coherence and engagement.`,
};

const fitnessPortfolio = {
  title: "Visual Identity Design: Rebanding Body Planet and redesigning its Website",
  description: `For this project, I did a rebranding of Body Planet, a local gym, through the development of a new visual identity, Logo and digital interfaces for their Website. The goal was to shift the perception of the gym from a performance-driven space to a more welcoming environment focused on wellbeing, personalisation, and community. Starting from research and competitor analysis, the project defined new brand values, a refreshed logo, color palette, and typography. These elements were then applied consistently across high-fidelity web and app interfaces, as well as promotional posters.`,
  link: "https://www.figma.com/proto/wVHCRUuK7oi4OIptxeixpO/S1-P1-Lo-Fi-Prototype?page-id=0%3A1&node-id=139-317&viewport=144%2C-489%2C0.09&t=olH5GW7t4dxbgT7B-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=139%3A317",
};

const magazinePortfolio = {
  title: "Digital Magazine Layout",
  description: `For this project, I created a personal magazine that explores my visual identity as a designer and reflects my passions, including travelling, cooking, music, and design. I focused on editorial design and typographical layout, experimenting with grids, hierarchy, and visual storytelling to create a cohesive yet expressive publication. Using Adobe InDesign, Illustrator, and Photoshop, I translated my personality and interests into dynamic page layouts that balance structure with creativity. Through this process, I deepened my understanding of editorial principles, bettered my technical skills, and got the opportunity to express and explore my style as designer.`,
  link: magazinePdf,
};

export function useLauraPortfolios() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [polaroidOpen, setPolaroidOpen] = useState(false);
  const [fitnessOpen, setFitnessOpen] = useState(false);
  const [magazineOpen, setMagazineOpen] = useState(false);
  const { addItem } = useInventory();

  const openShowreel = () => setShowreelOpen(true);
  const openPolaroid = () => setPolaroidOpen(true);
  const openFitness = () => setFitnessOpen(true);
  const openMagazine = () => setMagazineOpen(true);

  const handlePolaroidClose = () => {
    setPolaroidOpen(false);
    addItem('polaroid');
  };

  const modals = (
    <>
      <PortfolioModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        title={showreelPortfolio.title}
        videoId={showreelPortfolio.videoId}
      >
        <p>{showreelPortfolio.description}</p>
      </PortfolioModal>
      <PortfolioModal
        isOpen={fitnessOpen}
        onClose={() => setFitnessOpen(false)}
        title={fitnessPortfolio.title}
        externalLink={fitnessPortfolio.link}
        linkLabel="prototype"
      >
        <p>{fitnessPortfolio.description}</p>
      </PortfolioModal>
      <PortfolioModal
        isOpen={magazineOpen}
        onClose={() => setMagazineOpen(false)}
        title={magazinePortfolio.title}
        externalLink={magazinePortfolio.link}
        linkLabel="magazine"
      >
        <p>{magazinePortfolio.description}</p>
      </PortfolioModal>
      <PolaroidModal
        isOpen={polaroidOpen}
        onClose={handlePolaroidClose}
      />
    </>
  );

  return { openShowreel, openPolaroid, openFitness, openMagazine, modals };
}
