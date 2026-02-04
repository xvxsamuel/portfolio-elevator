import styles from './BackArrow.module.css';

interface BackArrowProps {
  onClick: () => void;
}

export function BackArrow({ onClick }: BackArrowProps) {
  return (
    <div className={styles.arrow} onClick={onClick}>
      <span>▼</span>
    </div>
  );
}
