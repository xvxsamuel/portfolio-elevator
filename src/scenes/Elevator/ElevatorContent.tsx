import { Hotspot } from '../../components/Hotspot';
import { Fly } from '../../components/Fly';
import { useGame } from '../../context/GameProvider';
import flyImg from '../../assets/images/interiors/elevator/fly.png';

interface ElevatorContentProps {
  onButtonsClick: () => void;
}

export function ElevatorContent({ onButtonsClick }: ElevatorContentProps) {
  const { showDialogue, playerName } = useGame();

  return (
    <>
      <Hotspot 
        x={68} y={42.5} width={7} height={15}
        onClick={onButtonsClick}
        label="Buttons"
      />
      
      <Fly x={83} y={69} size={0.8} imageSrc={flyImg} delay={0} />
      <Fly x={83} y={72.5} size={0.7} imageSrc={flyImg} delay={-0.8} />
      <Fly x={79} y={66.3} size={1.1} imageSrc={flyImg} delay={-1.6} />
      
      <Hotspot 
        x={73.5} y={71.5} width={15} height={25}
        onClick={() => showDialogue('Disgusting.', playerName)}
        label="Trash"
      />
    </>
  );
}
