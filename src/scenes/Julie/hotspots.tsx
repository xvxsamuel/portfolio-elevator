import { Hotspot } from '../../components/ui/Hotspot';
import { useInventory } from '../../hooks/useInventory';
import { useJuliePortfolios } from './portfolio';
import cupSound from '../../assets/audio/martina/cup.mp3';

export function JulieHotspots() {
  const { hasItem, addItem } = useInventory();
  const { openComputer, openMagazine, openPoster, modals } = useJuliePortfolios();

  return (
    <>
      <Hotspot
        x={47.3} y={80} width={15.7} height={20}
        dialogue="This is a yarn basket: it exists for listening to gruesome murder mystery documentaries because it itches that part of the brain where death and comfort inevitably intersect."
        label="Yarn basket by bed"
      />

      <Hotspot
        x={77.6} y={47} width={5.35} height={9.3}
        dialogue="This basket represents a late-stage relationship between storage and desire; what began as a simple means to organization has become serious all-consuming devotion."
        label="Yarn basket on dresser"
      />

      <Hotspot
        x={85.35} y={48.2} width={5.8} height={10}
        dialogue="Why did you click on this, you already know it is a basket containing yarn."
        label="Other yarn basket"
      />

      <Hotspot
        x={22.5} y={11} width={17} height={37}
        dialogue="Ah, yes! The humble donkey saddle blanket reminds us of the loyalty of these hardworking creatures."
        label="Wall tapestry"
      />

      <Hotspot
        x={55.65} y={51} width={3} height={5}
        dialogue="Mugs contain liquids. This one's purpose is obvious and ongoing."
        sound={cupSound}
        label="Mug"
      />

      {!hasItem('urn') && (
        <Hotspot
          x={83} y={51.4} width={2.3} height={5.3}
          onDialogueComplete={() => addItem('urn')}
          dialogue="This urn is still empty, but at some point it will not be. All in due time, we ought not to be impatient."
          label="Urn"
        />
      )}

      <Hotspot
        x={45.6} y={41.5} width={10} height={14}
        onClick={openComputer}
        label="Computer"
      />

      <Hotspot
        x={50} y={50} width={8} height={10}
        onClick={openMagazine}
        label="Magazine"
      />

      <Hotspot
        x={30} y={30} width={10} height={15}
        onClick={openPoster}
        label="Poster"
      />

      {modals}
    </>
  );
}
