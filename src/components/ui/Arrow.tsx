import styles from './Arrow.module.css';

interface ArrowProps {
  onClick: () => void;
  direction?: 'up' | 'down' | 'left' | 'right';
  style?: React.CSSProperties;
  className?: string;
  pulse?: boolean;
  perspective?: boolean;
}

const ARROW_SYMBOLS = {
  up: '▲',
  down: '▼',
  left: '◀',
  right: '▶',
};

export function Arrow({ 
  onClick, 
  direction = 'down', 
  style, 
  className = '',
  pulse = false,
  perspective = false,
}: ArrowProps) {
  const classes = [
    styles.arrow,
    pulse && styles.pulse,
    perspective && styles.perspective,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick} style={style}>
      <span>{ARROW_SYMBOLS[direction]}</span>
    </div>
  );
}
