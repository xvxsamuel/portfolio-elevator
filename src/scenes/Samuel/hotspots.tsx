import { useState, useRef } from 'react';
import { Hotspot } from '../../components/ui/Hotspot';
import { useInventory } from '../../hooks/useInventory';
import { useGame } from '../../context/GameProvider';
import { getPreloadedAudio } from '../../hooks/usePreloader';
import { Cat } from './objects/Cat';
import { Mask } from './objects/Mask';
import { Fish } from './objects/Fish';
import { RecordPlayer } from './objects/RecordPlayer';
import { useSamuelPortfolios } from './portfolio';
import meowSound from '../../assets/audio/elevator/meow.mp3';
import fishSound from '../../assets/audio/samuel/fish.mp3';

export function SamuelHotspots() {
  const { hasItem, addItem } = useInventory();
  const { showDialogue, playerName, masterVolume } = useGame();
  const { openPortfolio, openGame, modals } = useSamuelPortfolios();
  const [recordPlayerOpen, setRecordPlayerOpen] = useState(false);
  const [fishAnimating, setFishAnimating] = useState(false);
  const fishTimeoutRef = useRef<number | null>(null);

  const handleFishClick = () => {
    if (fishTimeoutRef.current) {
      clearTimeout(fishTimeoutRef.current);
    }
    setFishAnimating(true);

    const fishAudio = getPreloadedAudio(fishSound);
    fishAudio.volume = masterVolume / 100;
    fishAudio.currentTime = 0;
    fishAudio.play();

    fishTimeoutRef.current = window.setTimeout(() => {
      setFishAnimating(false);
      fishTimeoutRef.current = null;
    }, 2000);

    openGame();
  };

  const handleRecordPlayerClick = () => {
    setRecordPlayerOpen(prev => !prev);
  };

  const handleCatClick = () => {
    showDialogue("Oh, hey there little guy. Where's your owner?", playerName, () => {
      const meowAudio = getPreloadedAudio(meowSound);
      meowAudio.volume = masterVolume / 100;
      meowAudio.currentTime = 0;
      meowAudio.play();

      setTimeout(() => {
        showDialogue("Mhm. I see.", playerName);
      }, 1500);
    });
  };

  return (
    <>
      <Cat />
      {!hasItem('mask') && <Mask />}
      <Fish isAnimating={fishAnimating} />
      <RecordPlayer isOpen={recordPlayerOpen} />

      <Hotspot
        x={7.2} y={22} width={13} height={17}
        onClick={handleFishClick}
        label="Fish"
      />

      <Hotspot
        x={12.3} y={59.5} width={12} height={8}
        onClick={handleRecordPlayerClick}
        label="Record player"
      />

      {!hasItem('mask') && (
        <Hotspot
          x={29.8} y={26.3} width={5.6} height={14.2}
          onDialogueComplete={() => addItem('mask')}
          dialogue="Ooh, an ancient shaman mask! My favorite!"
          label="Shaman mask"
        />
      )}

      <Hotspot
        x={9.2} y={67.5} width={7} height={5}
        dialogue="Bladee..? Who listens to this shit?"
        label="Records"
      />

      <Hotspot
        x={21} y={73.5} width={13} height={11.3}
        onClick={handleCatClick}
        label="Cat"
      />

      <Hotspot
        x={50.5} y={39} width={10.5} height={14.5}
        dialogue="Do they like gaslighting or being the one gaslighted?"
        label="Shirt"
      />

      <Hotspot
        x={68.6} y={24.8} width={2.2} height={48}
        dialogue="It's locked."
        label="Door"
      />

      <Hotspot
        x={39} y={20.5} width={6.7} height={16.5}
        dialogue="I wouldn't want that blade above my bed."
        label="Figurine"
      />

      <Hotspot
        x={49.4} y={53.6} width={10.5} height={11.5}
        onClick={openPortfolio}
        label="Laptop"
      />

      {modals}
    </>
  );
}
