import { Arrow } from './Arrow';

interface BackArrowProps {
  onClick: () => void;
  style?: React.CSSProperties;
  direction?: 'up' | 'down' | 'left' | 'right';
  pulse?: boolean;
  perspective?: boolean;
}

export function BackArrow({ onClick, style, direction = 'down', pulse = true, perspective = true }: BackArrowProps) {
  return (
    <Arrow 
      onClick={onClick} 
      direction={direction}
      pulse={pulse}
      perspective={perspective}
      style={style}
    />
  );
}
