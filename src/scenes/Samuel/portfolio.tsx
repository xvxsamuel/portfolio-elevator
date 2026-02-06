import { useState } from 'react';
import { PortfolioModal, type PortfolioImage } from '../../components/ui/PortfolioModal';

const placeholderPortfolio = {
  title: "ARAM PIG: React, Next.js, Postgres, Tailwind",
  images: [] as PortfolioImage[],
  description: `Wanting to expand my skillset, I decided to focus on web development for the first two sprints of the semester. I initially intended to only stick to React, but as I continued development I was forced to adapt and learn new skills to turn my ideas into reality. The website is a fully functional League of Legends account lookup tool, communicating with the official API, storing data in a Postgres database, fetching and displaying it to the user. It features a custom performance grading algorithm, based on passively scraped data, based on which I calculate various metrics. Almost all content on the site is dynamic, automatically updating as new data gets scraped from existing matches. It also features a stats view where users are able to view per-champion statistics featuring win rates, pick rates, and confidence-adjusted rankings of builds. As my goal was to have a production-ready website, it also auto-updates alongside League patches, dynamically updating its item database to account for changes to the actual game.`,
  externalLink: "https://arampig.lol/",
  linkLabel: "website",
};

export function useSamuelPortfolios() {
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  const openPortfolio = () => setPortfolioOpen(true);

  const modals = (
    <>
      <PortfolioModal
        isOpen={portfolioOpen}
        onClose={() => setPortfolioOpen(false)}
        title={placeholderPortfolio.title}
        images={placeholderPortfolio.images}
        externalLink={placeholderPortfolio.externalLink}
        linkLabel={placeholderPortfolio.linkLabel}
      >
        <p>{placeholderPortfolio.description}</p>
      </PortfolioModal>
    </>
  );

  return { openPortfolio, modals };
}
