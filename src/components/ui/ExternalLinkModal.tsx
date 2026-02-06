import { Modal } from './Modal';
import { TextButton } from './TextButton';
import styles from './ExternalLinkModal.module.css';

interface ExternalLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export function ExternalLinkModal({ isOpen, onClose, url }: ExternalLinkModalProps) {
  const handleContinue = () => {
    window.open(url, '_blank');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container} onClick={e => e.stopPropagation()}>
        <p className={styles.message}>
          A new tab will open to view this project.
        </p>
        <div className={styles.buttons}>
          <TextButton onClick={onClose}>Cancel</TextButton>
          <TextButton onClick={handleContinue}>Continue</TextButton>
        </div>
      </div>
    </Modal>
  );
}
