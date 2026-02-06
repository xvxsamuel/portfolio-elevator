import { Fly } from './objects/Fly';
import { ElevatorHotspots } from './hotspots';
import flyImg from '../../assets/images/interiors/elevator/fly.png';

interface ElevatorContentProps {
  onButtonsClick: () => void;
  onExitClick: () => void;
}

export function ElevatorContent({ onButtonsClick, onExitClick }: ElevatorContentProps) {
  return (
    <>
      <ElevatorHotspots onButtonsClick={onButtonsClick} onExitClick={onExitClick} />
      
      <Fly x={83} y={69} size={0.8} imageSrc={flyImg} delay={0} />
      <Fly x={83} y={72.5} size={0.7} imageSrc={flyImg} delay={-0.8} />
      <Fly x={79} y={66.3} size={1.1} imageSrc={flyImg} delay={-1.6} />
    </>
  );
}
