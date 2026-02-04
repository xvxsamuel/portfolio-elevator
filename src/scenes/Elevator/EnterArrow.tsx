import styles from './ElevatorScene.module.css';

interface EnterArrowProps {
  visible: boolean;
  onClick: () => void;
}

export function EnterArrow({ visible, onClick }: EnterArrowProps) {
  if (!visible) return null;
  
  return (
    <div className={styles.arrow} onClick={onClick}>
      <span>▲</span>
    </div>
  );
}
