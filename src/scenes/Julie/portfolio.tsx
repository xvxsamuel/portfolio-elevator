import { useState } from 'react';
import { PortfolioModal, type PortfolioImage } from '../../components/ui/PortfolioModal';

const placeholderPortfolio = {
  title: "Julie's Portfolio",
  images: [] as PortfolioImage[],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
};

export function useJuliePortfolios() {
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  const openPortfolio = () => setPortfolioOpen(true);

  const modals = (
    <>
      <PortfolioModal
        isOpen={portfolioOpen}
        onClose={() => setPortfolioOpen(false)}
        title={placeholderPortfolio.title}
        images={placeholderPortfolio.images}
      >
        <p>{placeholderPortfolio.description}</p>
      </PortfolioModal>
    </>
  );

  return { openPortfolio, modals };
}
