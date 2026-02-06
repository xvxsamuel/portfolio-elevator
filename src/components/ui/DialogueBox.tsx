import { ChevronRight } from './icons';
import styles from './DialogueBox.module.css';

interface DialogueBoxProps {
  text: string;
  speaker?: string;
  onComplete?: () => void;
  isVisible: boolean;
  isFirst?: boolean;
}

export function DialogueBox({ text, speaker, onComplete, isVisible, isFirst = false }: DialogueBoxProps) {
  return (
    <div 
      className={`${styles.overlay} ${isVisible ? styles.visible : styles.hidden}`} 
      onClick={isVisible ? onComplete : undefined}
    >
      <div className={styles.box}>
        {speaker && <div className={styles.speaker}>{speaker}</div>}
        <div className={styles.text}>{text}</div>
        <div className={styles.continueHint}>
          {isFirst && <span className={styles.continueText}>Click to continue</span>}
          <ChevronRight className={styles.chevron} />
        </div>
      </div>
    </div>
  );
}
