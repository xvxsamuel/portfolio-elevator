import { Hotspot } from '../../components/ui/Hotspot';
import { useInventory } from '../../hooks/useInventory';
import { Notes } from './objects/Notes';
import { Steam } from './objects/Steam';
import cupSound from '../../assets/audio/martina/cup.mp3';

interface LauraHotspotsProps {
  onLaptopClick?: () => void;
}

export function LauraHotspots({ onLaptopClick }: LauraHotspotsProps) {
  const { hasItem, addItem } = useInventory();

  return (
    <>
      <Notes />
      <Steam />

      <Hotspot
        x={0} y={0} width={10} height={10}
        dialogue="Ah, the mug has opinions.. Interesting choice of morning affirmation."
        sound={cupSound}
        label="Coffee mug"
      />

      <Hotspot
        x={0} y={0} width={10} height={10}
        dialogue="Wow, that's an impressive commitment to cardboard."
        label="Shoe boxes"
      />

      <Hotspot
        x={0} y={0} width={10} height={10}
        dialogue="That explains a lot."
        label="Pizza blanket"
      />

      <Hotspot
        x={54.6} y={50} width={13.5} height={12}
        dialogue="Of course, the ultimate Italian survival kit."
        label="Food/drinks in drawer"
      />

      <Hotspot
        x={0} y={0} width={10} height={10}
        dialogue="This has definitely witnessed things..."
        label="Octopus"
      />

      <Hotspot
        x={0} y={0} width={10} height={10}
        onClick={onLaptopClick}
        label="Laptop"
      />

      {!hasItem('polaroid') && (
        <Hotspot
          x={0} y={0} width={10} height={10}
          onClick={() => addItem('polaroid')}
          dialogue="A camera... and what's this? A polaroid slips out."
          label="Camera"
        />
      )}
    </>
  );
}
