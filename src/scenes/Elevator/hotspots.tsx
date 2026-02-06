import { Hotspot } from '../../components/ui/Hotspot';
import rustleSound from '../../assets/audio/elevator/rustle.mp3';

interface ElevatorHotspotsProps {
  onButtonsClick: () => void;
  onExitClick: () => void;
}

export function ElevatorHotspots({ onButtonsClick, onExitClick }: ElevatorHotspotsProps) {
  return (
    <>
      <Hotspot 
        x={68} y={42.5} width={7} height={15}
        onClick={onButtonsClick}
        label="Buttons"
      />

      <Hotspot 
        x={68} y={58} width={7} height={8}
        onClick={onExitClick}
        label="Exit buttons"
      />
      
      <Hotspot 
        x={73.5} y={71.5} width={15} height={25}
        dialogue="Eww... Smells like Den Haag HS."
        sound={rustleSound}
        label="Trash"
      />

      <Hotspot 
        x={15} y={74.5} width={14.5} height={17}
        dialogue="What a practical multi-purpose bag. I can't believe I got it for free!"
        label="Bag"
      />

      <Hotspot 
        x={68.3} y={21} width={7.2} height={16.2}
        dialogue="Raccoon sock..? What even is that?"
        label="Racoon poster"
      />
    </>
  );
}
