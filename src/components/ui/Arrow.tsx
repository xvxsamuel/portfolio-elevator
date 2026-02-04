import styles from './Arrow.module.css';

interface ArrowProps {
  onClick: () => void;
  direction?: 'up' | 'down' | 'left' | 'right';
  style?: React.CSSProperties;
  className?: string;
  pulse?: boolean;
  perspective?: boolean;
  rotation?: { x?: number; y?: number; z?: number };
  visible?: boolean;
}

export function Arrow({ 
  onClick, 
  direction = 'down', 
  style, 
  className = '',
  pulse = false,
  perspective = false,
  rotation,
  visible = true,
}: ArrowProps) {
  const classes = [
    styles.arrow,
    pulse && styles.pulse,
    perspective && styles.perspective,
    styles[direction],
    visible ? styles.visible : styles.hidden,
    className,
  ].filter(Boolean).join(' ');

  const rotationTransform = rotation 
    ? `rotateX(${rotation.x ?? 0}deg) rotateY(${rotation.y ?? 0}deg) rotateZ(${rotation.z ?? 0}deg)`
    : '';

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(rotation && { transform: `${style?.transform || ''} ${rotationTransform}`.trim() }),
  };

  return (
    <div className={classes} onClick={onClick} style={combinedStyle}>
      <div className={styles.triangle} />
    </div>
  );
}
