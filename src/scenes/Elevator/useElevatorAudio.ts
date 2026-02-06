import { useRef, useEffect, useCallback } from 'react';
import { useGame } from '../../context/GameProvider';
import { getPreloadedAudio } from '../../hooks/usePreloader';
import liftButtonSound from '../../assets/audio/elevator/lift_ button.mp3';
import liftMoveSound from '../../assets/audio/elevator/lift_move.mp3';
import liftStopAndOpenSound from '../../assets/audio/elevator/lift_stop_and_open.mp3';
import doorOpenSound from '../../assets/audio/elevator/open_door.mp3';
import elevatorAmbienceSound from '../../assets/audio/elevator/elevator_ambience.mp3';
import flySound from '../../assets/audio/elevator/fly.mp3';

export function useElevatorAudio() {
  const { masterVolume, registerAudio, unregisterAudio } = useGame();
  
  const liftButtonAudio = useRef(getPreloadedAudio(liftButtonSound));
  const liftMoveAudio = useRef(getPreloadedAudio(liftMoveSound));
  const liftStopOpenAudio = useRef(getPreloadedAudio(liftStopAndOpenSound));
  const doorOpenAudio = useRef(getPreloadedAudio(doorOpenSound));
  const elevatorAmbienceAudio = useRef(getPreloadedAudio(elevatorAmbienceSound));
  const flyAudio = useRef(getPreloadedAudio(flySound));
  const fadeIntervalRef = useRef<number | null>(null);
  const isFadingOut = useRef(false);
  const flyPausedRef = useRef(false);
  const flyTimeoutRef = useRef<number>(0);
  const flyFadeInRef = useRef<number>(0);
  const flyFadeOutRef = useRef<number>(0);
  const flyHoldRef = useRef<number>(0);
  const scheduleFlyRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isFadingOut.current) return;
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
    registerAudio(ambience);
    ambience.play();
    
    fly.loop = true;
    fly.volume = 0;
    registerAudio(fly);
    fly.play();
    
    const scheduleFlyPassBy = () => {
      if (flyPausedRef.current) return;
      const delay = 15000 + Math.random() * 30000;
      flyTimeoutRef.current = window.setTimeout(() => {
        if (flyPausedRef.current) return;
        const peakVolume = 0.025 * (masterVolume / 100);
        const fadeTime = 500; 
        const holdDuration = 500 + Math.random() * 2500; 
        const fadeSteps = 20;
        let step = 0;
        
        flyFadeInRef.current = window.setInterval(() => {
          if (flyPausedRef.current) {
            clearInterval(flyFadeInRef.current);
            fly.volume = 0;
            return;
          }
          step++;
          fly.volume = (step / fadeSteps) * peakVolume;
          if (step >= fadeSteps) {
            clearInterval(flyFadeInRef.current);
            fly.volume = peakVolume;
            
            flyHoldRef.current = window.setTimeout(() => {
              if (flyPausedRef.current) {
                fly.volume = 0;
                return;
              }
              step = 0;
              flyFadeOutRef.current = window.setInterval(() => {
                if (flyPausedRef.current) {
                  clearInterval(flyFadeOutRef.current);
                  fly.volume = 0;
                  return;
                }
                step++;
                fly.volume = peakVolume * (1 - step / fadeSteps);
                if (step >= fadeSteps) {
                  clearInterval(flyFadeOutRef.current);
                  fly.volume = 0;
                  scheduleFlyPassBy();
                }
              }, fadeTime / fadeSteps);
            }, holdDuration);
          }
        }, fadeTime / fadeSteps);
      }, delay);
    };

    scheduleFlyRef.current = scheduleFlyPassBy;
    scheduleFlyPassBy();
    
    return () => {
      liftMoveAudio.current.pause();
      liftStopOpenAudio.current.pause();
      unregisterAudio(ambience);
      unregisterAudio(fly);
      ambience.pause();
      fly.pause();
      clearTimeout(flyTimeoutRef.current);
      clearTimeout(flyHoldRef.current);
      clearInterval(flyFadeInRef.current);
      clearInterval(flyFadeOutRef.current);
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [registerAudio, unregisterAudio]);

  const pauseFly = useCallback(() => {
    flyPausedRef.current = true;
    clearTimeout(flyTimeoutRef.current);
    clearTimeout(flyHoldRef.current);
    clearInterval(flyFadeInRef.current);
    clearInterval(flyFadeOutRef.current);
    flyAudio.current.volume = 0;
  }, []);

  const resumeFly = useCallback(() => {
    flyPausedRef.current = false;
    scheduleFlyRef.current?.();
  }, []);

  const fadeOutAmbience = useCallback((duration: number = 2000) => {
    isFadingOut.current = true;
    const ambience = elevatorAmbienceAudio.current;
    const fly = flyAudio.current;
    const startAmbienceVolume = ambience.volume;
    const startFlyVolume = fly.volume;
    const fadeSteps = 40;
    const stepDuration = duration / fadeSteps;
    let step = 0;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    fadeIntervalRef.current = window.setInterval(() => {
      step++;
      const progress = step / fadeSteps;
      ambience.volume = startAmbienceVolume * (1 - progress);
      fly.volume = startFlyVolume * (1 - progress);
      
      if (step >= fadeSteps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        ambience.pause();
        fly.pause();
      }
    }, stepDuration);
  }, []);

  return {
    liftButtonAudio,
    liftMoveAudio,
    liftStopOpenAudio,
    doorOpenAudio,
    fadeOutAmbience,
    pauseFly,
    resumeFly,
  };
}
