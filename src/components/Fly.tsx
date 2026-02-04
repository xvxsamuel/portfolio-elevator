import styles from './Fly.module.css';

interface FlyProps {
  x: number;
  y: number;
  size?: number;
  imageSrc: string;
  delay?: number;
}

export function Fly({ x, y, size = 2, imageSrc, delay = 0 }: FlyProps) {
  return (
    <div 
      className={styles.flyContainer}
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        '--fly-size': `${size}%`,
        '--fly-delay': `${delay}s`,
      } as React.CSSProperties}
    >
      <div className={styles.fly}>
        <img src={imageSrc} alt="" className={styles.flyImage} />
      </div>
    </div>
  );
}
