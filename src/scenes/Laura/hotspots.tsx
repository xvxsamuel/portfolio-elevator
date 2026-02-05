import { Hotspot } from '../../components/ui/Hotspot';
import { useInventory } from '../../hooks/useInventory';
import { Notes } from './objects/Notes';
import { Steam } from './objects/Steam';
import cupSound from '../../assets/audio/martina/cup.mp3';

interface LauraHotspotsProps {
  onLaptopClick?: () => void;
  onCameraClick?: () => void;
  onFitnessClick?: () => void;
  onMagazineClick?: () => void;
}

export function LauraHotspots({ onLaptopClick, onCameraClick, onFitnessClick, onMagazineClick }: LauraHotspotsProps) {
  const { hasItem } = useInventory();

  return (
    <>
      <Notes />
      <Steam />

      <Hotspot
        x={27} y={50.5} width={2.8} height={5}
        dialogue="Ah, the mug has opinions.. Interesting choice of morning affirmation."
        sound={cupSound}
        label="Coffee mug"
      />

      <Hotspot
        x={73} y={59.2} width={13.2} height={18.5}
        dialogue="Wow, that's an impressive commitment to cardboard."
        label="Shoe boxes"
      />

      <Hotspot
        x={0} y={57.3} width={24.4} height={31.7}
        dialogue="That explains a lot."
        label="Pizza blanket"
      />

      <Hotspot
        x={54.6} y={50} width={13.5} height={12}
        dialogue="Of course, the ultimate Italian survival kit."
        label="Food/drinks in drawer"
      />

      <Hotspot
        x={58} y={21.8} width={10.9} height={19}
        dialogue="This has definitely witnessed things..."
        label="Octopus"
      />

      <Hotspot
        x={60} y={80.5} width={11} height={10}
        onClick={onLaptopClick}
        label="Laptop"
      />

      {!hasItem('polaroid') && (
        <Hotspot
          x={70.5} y={29.5} width={3.5} height={5}
          onClick={onCameraClick}
          label="Camera"
        />
      )}

      <Hotspot
        x={79} y={8} width={9.8} height={51}
        onClick={onFitnessClick}
        label="Fitness posters"
      />

      <Hotspot
        x={14.8} y={20.2} width={9.6} height={21.6}
        onClick={onMagazineClick}
        label="Magazine poster"
      />
    </>
  );
}
