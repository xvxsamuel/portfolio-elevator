import { Hotspot } from '../../components/ui/Hotspot';

interface ElevatorHotspotsProps {
  onButtonsClick: () => void;
}

export function ElevatorHotspots({ onButtonsClick }: ElevatorHotspotsProps) {
  return (
    <>
      <Hotspot 
        x={68} y={42.5} width={7} height={15}
        onClick={onButtonsClick}
        label="Buttons"
      />
      
      <Hotspot 
        x={73.5} y={71.5} width={15} height={25}
        dialogue="Disgusting."
        label="Trash"
      />
    </>
  );
}
