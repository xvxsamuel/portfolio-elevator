import { useState } from 'react';
import { PortfolioModal, type PortfolioImage } from '../../components/ui/PortfolioModal';

const computerPortfolio = {
  title: "Interactive Prototype",
  images: [] as PortfolioImage[],
  description: `Placeholder description for the computer prototype project.`,
  externalLink: "https://www.figma.com/proto/wIzoF2HnPDkdZ6m79xexOp/Final-Juliette?node-id=0-1&t=nzwRmgMgRqj5ovww-1",
  linkLabel: "Link to prototype",
};

const magazinePortfolio = {
  title: "Magazine Design",
  images: [] as PortfolioImage[],
  description: `Placeholder description for the magazine project.`,
  externalLink: "#",
  linkLabel: "Link to magazine",
};

const posterPortfolio = {
  title: "Poster Design",
  images: [] as PortfolioImage[],
  description: `Placeholder description for the poster project.`,
};

export function useJuliePortfolios() {
  const [computerOpen, setComputerOpen] = useState(false);
  const [magazineOpen, setMagazineOpen] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);

  const openComputer = () => setComputerOpen(true);
  const openMagazine = () => setMagazineOpen(true);
  const openPoster = () => setPosterOpen(true);

  const modals = (
    <>
      <PortfolioModal
        isOpen={computerOpen}
        onClose={() => setComputerOpen(false)}
        title={computerPortfolio.title}
        images={computerPortfolio.images}
        externalLink={computerPortfolio.externalLink}
        linkLabel={computerPortfolio.linkLabel}
      >
        <p>{computerPortfolio.description}</p>
      </PortfolioModal>

      <PortfolioModal
        isOpen={magazineOpen}
        onClose={() => setMagazineOpen(false)}
        title={magazinePortfolio.title}
        images={magazinePortfolio.images}
        externalLink={magazinePortfolio.externalLink}
        linkLabel={magazinePortfolio.linkLabel}
      >
        <p>{magazinePortfolio.description}</p>
      </PortfolioModal>

      <PortfolioModal
        isOpen={posterOpen}
        onClose={() => setPosterOpen(false)}
        title={posterPortfolio.title}
        images={posterPortfolio.images}
      >
        <p>{posterPortfolio.description}</p>
      </PortfolioModal>
    </>
  );

  return { openComputer, openMagazine, openPoster, modals };
}
