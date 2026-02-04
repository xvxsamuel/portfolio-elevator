import styles from './BackArrow.module.css';

interface BackArrowProps {
  onClick: () => void;
  style?: React.CSSProperties;
  arrow?: string;
}

export function BackArrow({ onClick, style, arrow = '▼' }: BackArrowProps) {
  return (
    <div className={styles.arrow} onClick={onClick} style={style}>
      <span>{arrow}</span>
    </div>
  );
}
