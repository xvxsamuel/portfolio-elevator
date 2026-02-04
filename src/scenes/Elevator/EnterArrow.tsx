import { Arrow } from '../../components/ui/Arrow';

interface EnterArrowProps {
  visible: boolean;
  onClick: () => void;
}

export function EnterArrow({ visible, onClick }: EnterArrowProps) {
  if (!visible) return null;
  
  return (
    <Arrow 
      onClick={onClick} 
      direction="up" 
      pulse 
      perspective 
      style={{ bottom: '17%', left: '50%', transform: 'translateX(-50%) perspective(200px) rotateX(60deg)' }}
    />
  );
}
