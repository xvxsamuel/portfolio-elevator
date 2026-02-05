import { useState } from 'react';
import { PortfolioModal, type PortfolioImage } from '../../components/ui/PortfolioModal';

import website1 from '../../assets/images/interiors/martina/portfolio/website/1.jpeg';
import website2 from '../../assets/images/interiors/martina/portfolio/website/2.jpeg';
import website3 from '../../assets/images/interiors/martina/portfolio/website/3.jpeg';
import website4 from '../../assets/images/interiors/martina/portfolio/website/4.jpeg';
import website5 from '../../assets/images/interiors/martina/portfolio/website/5.jpeg';

import ux1 from '../../assets/images/interiors/martina/portfolio/ux-illustrations/1.png';
import ux2 from '../../assets/images/interiors/martina/portfolio/ux-illustrations/2.png';
import ux3 from '../../assets/images/interiors/martina/portfolio/ux-illustrations/3.png';

import magazine1 from '../../assets/images/interiors/martina/portfolio/magazine/1.png';
import magazine2 from '../../assets/images/interiors/martina/portfolio/magazine/2.png';
import magazine3 from '../../assets/images/interiors/martina/portfolio/magazine/3.png';

const websitePortfolio = {
  title: "React Coding: Oma's Kitchen",
  images: [
    { src: website1, alt: "Oma's Kitchen website screenshot 1" },
    { src: website2, alt: "Oma's Kitchen website screenshot 2" },
    { src: website3, alt: "Oma's Kitchen website screenshot 3" },
    { src: website4, alt: "Oma's Kitchen website screenshot 4" },
    { src: website5, alt: "Oma's Kitchen website screenshot 5" },
  ] as PortfolioImage[],
  description: `Inspired by the name of the course, I really wanted to try my hand in coding with React. 
In this project, I coded a website that I had designed in a previous course as a Figma prototype. 
I recreated the prototype with React code and made working filters and animations, but that's 
about how far my coding went as I could not get it to host properly afterwards. Bummer!`,
};

const uxPortfolio = {
  title: 'UX Illustration: Creating Spotlight Images',
  images: [
    { src: ux1, alt: 'UX spotlight illustration 1' },
    { src: ux2, alt: 'UX spotlight illustration 2' },
    { src: ux3, alt: 'UX spotlight illustration 3' },
  ] as PortfolioImage[],
  description: `For this project I wanted to study and learn to create those static images that appear in 
all kinds of AI to aid the user. I think having an illustration breathes so much light into 
an otherwise boring UI. In the sprint I experimented a lot with drawing expressive characters 
and conveying different use cases for spotlight illustrations.`,
};

const magazinePortfolio = {
  title: 'Editorial Design: Fan Magazine',
  images: [
    { src: magazine1, alt: 'Foltin fan magazine page 1' },
    { src: magazine2, alt: 'Foltin fan magazine page 2' },
    { src: magazine3, alt: 'Foltin fan magazine page 3' },
  ] as PortfolioImage[],
  description: `For this project I wanted to make a magazine about one of my favorite Macedonian bands – Foltin. 
I learned how to use the software for making magazines, I improved my photo editing skills, 
I played around a lot with typography, composition and conveying the feeling of different eras.`,
};

export function useMartinaPortfolios() {
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const [uxOpen, setUxOpen] = useState(false);
  const [magazineOpen, setMagazineOpen] = useState(false);

  const openWebsite = () => setWebsiteOpen(true);
  const openUx = () => setUxOpen(true);
  const openMagazine = () => setMagazineOpen(true);

  const modals = (
    <>
      <PortfolioModal
        isOpen={websiteOpen}
        onClose={() => setWebsiteOpen(false)}
        title={websitePortfolio.title}
        images={websitePortfolio.images}
      >
        <p>{websitePortfolio.description}</p>
      </PortfolioModal>

      <PortfolioModal
        isOpen={uxOpen}
        onClose={() => setUxOpen(false)}
        title={uxPortfolio.title}
        images={uxPortfolio.images}
      >
        <p>{uxPortfolio.description}</p>
      </PortfolioModal>

      <PortfolioModal
        isOpen={magazineOpen}
        onClose={() => setMagazineOpen(false)}
        title={magazinePortfolio.title}
        images={magazinePortfolio.images}
      >
        <p>{magazinePortfolio.description}</p>
      </PortfolioModal>
    </>
  );

  return { openWebsite, openUx, openMagazine, modals };
}
