import { Arrow } from './Arrow';

interface BackArrowProps {
  onClick: () => void;
  style?: React.CSSProperties;
  direction?: 'up' | 'down' | 'left' | 'right';
  pulse?: boolean;
  perspective?: boolean;
  rotation?: { x?: number; y?: number; z?: number };
  visible?: boolean;
}

export function BackArrow({ onClick, style, direction = 'down', pulse = true, perspective = true, rotation, visible = true }: BackArrowProps) {
  const combinedStyle: React.CSSProperties = {
    ...style,
    transform: `${style?.transform || ''} scale(1.5)`.trim(),
  };

  return (
    <Arrow 
      onClick={onClick} 
      direction={direction}
      pulse={pulse}
      perspective={perspective}
      rotation={rotation}
      style={combinedStyle}
      visible={visible}
    />
  );
}
