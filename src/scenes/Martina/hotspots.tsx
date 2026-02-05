import { Hotspot } from '../../components/ui/Hotspot';
import { useInventory } from '../../hooks/useInventory';
import { useMartinaPortfolios } from './portfolio';
import meowSound from '../../assets/audio/elevator/meow.mp3';
import birdSound from '../../assets/audio/martina/bird.mp3';
import cupSound from '../../assets/audio/martina/cup.mp3';

export function MartinaHotspots() {
  const { hasItem, addItem } = useInventory();
  const { openWebsite, openUx, openMagazine, modals } = useMartinaPortfolios();

  return (
    <>
      <Hotspot
        x={77} y={0} width={11.2} height={28.5}
        dialogue="What a lovely whorse."
        label="Horse painting"
      />
      
      <Hotspot
        x={66.6} y={27.7} width={4.5} height={10}
        sound={meowSound}
        label="Cat sculpture"
      />
      
      <Hotspot
        x={30.5} y={89.2} width={5.5} height={6.5}
        dialogue="Eeek! I would not stick my feet in those!"
        label="Fish slippers"
      />
      
      <Hotspot
        x={45} y={81} width={3.3} height={4.5}
        dialogue="How do I skip this ad?"
        label="Remote"
      />
      
      <Hotspot
        x={46.5} y={64.5} width={3} height={5}
        dialogue="Hmm, still warm... Someone's here."
        sound={cupSound}
        label="Cup"
      />
      
      <Hotspot
        x={28.7} y={15.8} width={4} height={13}
        dialogue="He kinda looks like a Mohammed."
        label="McLovin"
      />
      
      <Hotspot
        x={14.5} y={18.7} width={7.2} height={11.2}
        sound={birdSound}
        label="Bird poster"
      />

      {!hasItem('rosary') && (
        <Hotspot
          x={67} y={53} width={4} height={8}
          onClick={() => addItem('rosary')}
          dialogue="Nice necklace. I hope no one minds I took it."
          label="Rosary"
        />
      )}

      <Hotspot
        x={36} y={37} width={12} height={25}
        onClick={openWebsite}
        label="TV"
      />

      <Hotspot
        x={20.5} y={36} width={6} height={12}
        onClick={openUx}
        label="Poster with little people"
      />

      <Hotspot
        x={51} y={64} width={4} height={7}
        onClick={openMagazine}
        label="Magazine"
      />

      {modals}
    </>
  );
}
