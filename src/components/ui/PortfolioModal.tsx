import { useEffect, useCallback, useState, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { useGame } from '../../context/GameProvider';
import { useFloorTheme } from '../../hooks/useFloorTheme';
import { CloseButton } from './CloseButton';
import { TextButton } from './TextButton';
import { ChevronLeft, ChevronRight } from './icons';
import styles from './PortfolioModal.module.css';

export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images?: PortfolioImage[];
  videoId?: string;
  externalLink?: string;
  linkLabel?: string;
  children: ReactNode;
  noParallax?: boolean;
}

function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

export function PortfolioModal({ 
  isOpen, 
  onClose, 
  title, 
  images = [],
  videoId,
  externalLink,
  linkLabel,
  children,
  noParallax = true
}: PortfolioModalProps) {
  const { setModalOpen } = useGame();
  const { muteTemporarily, restoreFromMute } = useFloorTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const wasMutedRef = useRef(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    setModalOpen(isOpen);
    return () => setModalOpen(false);
  }, [isOpen, setModalOpen]);

  useEffect(() => {
    if (videoId && isOpen && !wasMutedRef.current) {
      muteTemporarily();
      wasMutedRef.current = true;
    }
    if (!isOpen && wasMutedRef.current) {
      restoreFromMute();
      wasMutedRef.current = false;
    }
  }, [isOpen, videoId, muteTemporarily, restoreFromMute]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') scrollPrev();
      if (e.key === 'ArrowRight') scrollNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, scrollPrev, scrollNext]);

  if (!isOpen) return null;

  const overlayClasses = [
    styles.overlay,
    noParallax && styles.noParallax
  ].filter(Boolean).join(' ');

  const modal = (
    <div className={overlayClasses} onClick={onClose}>
      <div className={styles.container} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <CloseButton onClick={onClose} />
        </div>
        
        <div className={styles.scrollContent}>
          {videoId && (
            <div className={styles.videoWrapper}>
              <iframe
                src={getYouTubeEmbedUrl(videoId)}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {!videoId && images.length > 0 && (
            <>
              <div className={styles.carousel} ref={emblaRef}>
                <div className={styles.carouselContainer}>
                  {images.map((image, index) => (
                    <div className={styles.slide} key={index}>
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className={styles.slideImage}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {images.length > 1 && (
                <div className={styles.carouselControls}>
                  <button 
                    className={styles.carouselButton}
                    onClick={scrollPrev}
                    disabled={!canScrollPrev}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className={styles.chevron} />
                  </button>
                  
                  <div className={styles.dots}>
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ''}`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    className={styles.carouselButton}
                    onClick={scrollNext}
                    disabled={!canScrollNext}
                    aria-label="Next slide"
                  >
                    <ChevronRight className={styles.chevron} />
                  </button>
                </div>
              )}
            </>
          )}
          
          <div className={`${styles.description} ${(videoId || images.length > 0) ? styles.hasMediaAbove : ''}`}>
            {children}
          </div>

          {externalLink && (
            <TextButton
              href={externalLink}
              variant="dark"
              withChevron
              className={styles.externalLinkButton}
            >
              Click here to view {linkLabel || 'link'}
            </TextButton>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
