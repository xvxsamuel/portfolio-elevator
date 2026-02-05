import { useEffect } from 'react';
import { useGame } from '../../context/GameProvider';
import styles from './VideoModal.module.css';

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  videoId: string;
  description?: string;
  noParallax?: boolean;
}

function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

export function VideoModal({ 
  isOpen, 
  onClose, 
  title,
  videoId,
  description,
  noParallax = true
}: VideoModalProps) {
  const { setModalOpen } = useGame();

  useEffect(() => {
    setModalOpen(isOpen);
    return () => setModalOpen(false);
  }, [isOpen, setModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayClasses = [
    styles.overlay,
    noParallax && styles.noParallax
  ].filter(Boolean).join(' ');

  return (
    <div className={overlayClasses} onClick={onClose}>
      <div className={styles.container} onClick={e => e.stopPropagation()}>
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        )}
        
        {!title && (
          <button 
            className={styles.closeButton} 
            onClick={onClose} 
            aria-label="Close"
            style={{ position: 'absolute', top: '-50px', right: 0 }}
          >
            ×
          </button>
        )}
        
        <div className={styles.videoWrapper}>
          <iframe
            src={getYouTubeEmbedUrl(videoId)}
            title={title || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
    </div>
  );
}
