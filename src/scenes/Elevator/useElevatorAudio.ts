import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameProvider';
import liftButtonSound from '../../assets/audio/elevator/lift_ button.mp3';
import liftMoveSound from '../../assets/audio/elevator/lift_move.mp3';
import liftStopAndOpenSound from '../../assets/audio/elevator/lift_stop_and_open.mp3';
import doorOpenSound from '../../assets/audio/elevator/open_door.mp3';
import elevatorAmbienceSound from '../../assets/audio/elevator/elevator_ambience.mp3';
import flySound from '../../assets/audio/elevator/fly.mp3';

export function useElevatorAudio() {
  const { masterVolume } = useGame();
  
  const liftButtonAudio = useRef(new Audio(liftButtonSound));
  const liftMoveAudio = useRef(new Audio(liftMoveSound));
  const liftStopOpenAudio = useRef(new Audio(liftStopAndOpenSound));
  const doorOpenAudio = useRef(new Audio(doorOpenSound));
  const elevatorAmbienceAudio = useRef(new Audio(elevatorAmbienceSound));
  const flyAudio = useRef(new Audio(flySound));

  useEffect(() => {
    const volumeMultiplier = masterVolume / 100;
    liftButtonAudio.current.volume = volumeMultiplier;
    liftMoveAudio.current.volume = volumeMultiplier;
    liftStopOpenAudio.current.volume = volumeMultiplier;
    doorOpenAudio.current.volume = volumeMultiplier;
    elevatorAmbienceAudio.current.volume = 0.5 * volumeMultiplier;
  }, [masterVolume]);

  useEffect(() => {
    const ambience = elevatorAmbienceAudio.current;
    const fly = flyAudio.current;
    const volumeMultiplier = masterVolume / 100;
    
    ambience.loop = true;
    ambience.volume = 0.85 * volumeMultiplier;
    ambience.play();
    
    fly.loop = true;
    fly.volume = 0;
    fly.play();
    
    let flyTimeout: number;
    let fadeInInterval: number;
    let fadeOutInterval: number;
    let holdTimeout: number;
    
    const scheduleFlyPassBy = () => {
      const delay = 15000 + Math.random() * 30000;
      flyTimeout = window.setTimeout(() => {
        const peakVolume = 0.025 * (masterVolume / 100);
        const fadeTime = 500; 
        const holdDuration = 500 + Math.random() * 2500; 
        const fadeSteps = 20;
        let step = 0;
        
        fadeInInterval = window.setInterval(() => {
          step++;
          fly.volume = (step / fadeSteps) * peakVolume;
          if (step >= fadeSteps) {
            clearInterval(fadeInInterval);
            fly.volume = peakVolume;
            
            holdTimeout = window.setTimeout(() => {
              step = 0;
              fadeOutInterval = window.setInterval(() => {
                step++;
                fly.volume = peakVolume * (1 - step / fadeSteps);
                if (step >= fadeSteps) {
                  clearInterval(fadeOutInterval);
                  fly.volume = 0;
                  scheduleFlyPassBy();
                }
              }, fadeTime / fadeSteps);
            }, holdDuration);
          }
        }, fadeTime / fadeSteps);
      }, delay);
    };
  
    scheduleFlyPassBy();
    
    return () => {
      liftMoveAudio.current.pause();
      liftStopOpenAudio.current.pause();
      ambience.pause();
      fly.pause();
      clearTimeout(flyTimeout);
      clearTimeout(holdTimeout);
      clearInterval(fadeInInterval);
      clearInterval(fadeOutInterval);
    };
  }, []);

  return {
    liftButtonAudio,
    liftMoveAudio,
    liftStopOpenAudio,
    doorOpenAudio,
  };
}
