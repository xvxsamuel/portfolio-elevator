import { Arrow } from '../../components/ui/Arrow';

interface EnterArrowProps {
  visible: boolean;
  onClick: () => void;
}

export function EnterArrow({ visible, onClick }: EnterArrowProps) {
  return (
    <Arrow 
      onClick={onClick} 
      direction="up" 
      pulse 
      perspective
      visible={visible}
      style={{ bottom: '18%', left: '50%', transform: 'translateX(-50%) perspective(200px) rotateX(60deg) scale(1.5)' }}
    />
  );
}
