import { useState } from 'react';
import { PortfolioModal, type PortfolioImage } from '../../components/ui/PortfolioModal';
import magazinePdf from '../../assets/images/interiors/julie/portfolio/magazine/Latitude Magazine.pdf';
import poster1 from '../../assets/images/interiors/julie/portfolio/poster/1.png';
import poster2 from '../../assets/images/interiors/julie/portfolio/poster/2.png';
import poster3 from '../../assets/images/interiors/julie/portfolio/poster/3.png';

const computerPortfolio = {
  title: "E-commerce Website & Design System: Juliette's Cupboard",
  images: [] as PortfolioImage[],
  description: `Built as a desktop-focused prototype, this project explores how an editorial brand identity can be translated into a functional e-commerce experience. Clear layout structures, consistent components, and predictable interactions prioritise usability while allowing the brand's atmosphere to remain present.`,
  externalLink: "https://www.figma.com/proto/wIzoF2HnPDkdZ6m79xexOp/Final-Juliette?node-id=0-1&t=nzwRmgMgRqj5ovww-1",
  linkLabel: "prototype",
};

const magazinePortfolio = {
  title: "Editorial Design Sprint: Latitude Magazine",
  images: [] as PortfolioImage[],
  description: `This project investigates editorial structure as a narrative tool. Through analysis of professional magazines and iterative testing of grids, typographic hierarchy, and layout systems, Latitude was developed as an original publication centred on themes of belonging, displacement, and return.`,
  externalLink: magazinePdf,
  linkLabel: "magazine",
};

const posterPortfolio = {
  title: "Visual Identity: Juliette's Cupboard",
  images: [
    { src: poster1, alt: "Juliette's Cupboard poster 1" },
    { src: poster2, alt: "Juliette's Cupboard poster 2" },
    { src: poster3, alt: "Juliette's Cupboard poster 3" },
  ] as PortfolioImage[],
  description: `This project develops a visual identity grounded in editorial reference and material sensibility. Through structured typographic systems, a restrained colour palette, and repeatable layout rules, the identity is designed to work consistently across both print and digital formats.`,
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
