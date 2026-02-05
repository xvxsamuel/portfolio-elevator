import { Modal } from './Modal';
import { Button } from './Button';
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
      <div className={styles.container}>
        <p className={styles.message}>
          A new tab will open to view this project.
        </p>
        <div className={styles.buttons}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </div>
    </Modal>
  );
}
