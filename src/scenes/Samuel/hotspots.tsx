import { useState, useRef } from 'react';
import { Hotspot } from '../../components/ui/Hotspot';
import { ExternalLinkModal } from '../../components/ui/ExternalLinkModal';
import { useInventory } from '../../hooks/useInventory';
import { Fish } from './objects/Fish';
import { RecordPlayer } from './objects/RecordPlayer';

export function SamuelHotspots() {
  const { hasItem, addItem } = useInventory();
  const [recordPlayerOpen, setRecordPlayerOpen] = useState(false);
  const [fishAnimating, setFishAnimating] = useState(false);
  const [laptopModalOpen, setLaptopModalOpen] = useState(false);
  const fishTimeoutRef = useRef<number | null>(null);

  const handleFishClick = () => {
    if (fishTimeoutRef.current) {
      clearTimeout(fishTimeoutRef.current);
    }
    setFishAnimating(true);
    fishTimeoutRef.current = window.setTimeout(() => {
      setFishAnimating(false);
      fishTimeoutRef.current = null;
    }, 2000);
  };

  const handleRecordPlayerClick = () => {
    setRecordPlayerOpen(prev => !prev);
  };

  return (
    <>
      <Fish isAnimating={fishAnimating} />
      <RecordPlayer isOpen={recordPlayerOpen} />

      <Hotspot
        x={0} y={30} width={15} height={40}
        onClick={handleFishClick}
        label="Fish tank"
      />

      <Hotspot
        x={72} y={55} width={12} height={20}
        onClick={handleRecordPlayerClick}
        dialogue="Ooh, that's my jam!"
        label="Record player"
      />

      {!hasItem('mask') && (
        <Hotspot
          x={33} y={12} width={8} height={18}
          onDialogueComplete={() => addItem('mask')}
          dialogue="An ancient shaman mask. Looks powerful... and cursed."
          label="Shaman mask"
        />
      )}

      <Hotspot
        x={57} y={10} width={15} height={25}
        dialogue="Records from the golden era. Nice collection."
        label="Records"
      />

      <Hotspot
        x={45} y={70} width={10} height={20}
        dialogue="Oh, hey there little guy. Where's your owner? *meow* Mhm. I see."
        label="Cat"
      />

      <Hotspot
        x={20} y={25} width={10} height={25}
        dialogue="Do they like gaslighting or being the one gaslighted?"
        label="Shirt"
      />

      <Hotspot
        x={85} y={30} width={10} height={50}
        dialogue="It's locked."
        label="Door"
      />

      <Hotspot
        x={50} y={5} width={8} height={15}
        dialogue="I wouldn't want that blade down above my bed."
        label="Figurine"
      />

      <Hotspot
        x={62} y={50} width={8} height={12}
        onClick={() => setLaptopModalOpen(true)}
        label="Laptop"
      />

      <ExternalLinkModal
        isOpen={laptopModalOpen}
        onClose={() => setLaptopModalOpen(false)}
        url="https://example.com"
      />
    </>
  );
}
