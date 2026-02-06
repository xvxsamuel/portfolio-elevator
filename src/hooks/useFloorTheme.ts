import { useCallback } from 'react';
import { useGame } from '../context/GameProvider';
import { getPreloadedAudio } from './usePreloader';

import martinaTheme from '../assets/audio/martina/theme.mp3';
import julieTheme from '../assets/audio/julie/theme.mp3';
import lauraTheme from '../assets/audio/laura/theme.mp3';
import samuelTheme from '../assets/audio/samuel/theme.mp3';

const FLOOR_THEMES: Record<number, string> = {
  1: martinaTheme,
  4: julieTheme,
  5: lauraTheme,
  8: samuelTheme,
};

const FULL_VOLUME = 0.10;
const DISTANT_VOLUME = 0.02;
const DOOR_FADE_DURATION = 2500;
const TRANSITION_FADE_DURATION = 2000;
const MUTE_FADE_DURATION = 1000;
const FADE_STEPS = 40;

let activeAudio: HTMLAudioElement | null = null;
let activeFadeInterval: number | null = null;
let activeFloor: number | null = null;
let volumeBeforeMute: number | null = null;
let registeredUnregister: ((audio: HTMLAudioElement) => void) | null = null;

export function useFloorTheme() {
  const { masterVolume, registerAudio, unregisterAudio } = useGame();

  const getVolume = useCallback((multiplier: number) => {
    return (masterVolume / 100) * multiplier;
  }, [masterVolume]);

  const clearFadeInterval = useCallback(() => {
    if (activeFadeInterval) {
      clearInterval(activeFadeInterval);
      activeFadeInterval = null;
    }
  }, []);

  const fadeTo = useCallback((targetVolume: number, duration: number = TRANSITION_FADE_DURATION) => {
    if (!activeAudio) return;
    clearFadeInterval();

    const audio = activeAudio;
    const startVolume = audio.volume;
    const volumeDiff = targetVolume - startVolume;
    const stepTime = duration / FADE_STEPS;
    let step = 0;

    activeFadeInterval = window.setInterval(() => {
      step++;
      const newVolume = startVolume + (volumeDiff * (step / FADE_STEPS));
      if (step >= FADE_STEPS) {
        audio.volume = targetVolume;
        clearFadeInterval();
      } else {
        audio.volume = newVolume;
      }
    }, stepTime);
  }, [clearFadeInterval]);

  const startDistant = useCallback((floor: number) => {
    const themeSrc = FLOOR_THEMES[floor];
    if (!themeSrc) return;

    if (activeAudio) {
      if (registeredUnregister) registeredUnregister(activeAudio);
      activeAudio.pause();
      activeAudio = null;
    }
    clearFadeInterval();

    const audio = getPreloadedAudio(themeSrc);
    audio.loop = true;
    audio.volume = 0;
    audio.currentTime = 0;
    activeAudio = audio;
    activeFloor = floor;
    registeredUnregister = unregisterAudio;
    registerAudio(audio);

    audio.play().catch(() => {});
    fadeTo(getVolume(DISTANT_VOLUME), DOOR_FADE_DURATION);
  }, [clearFadeInterval, fadeTo, getVolume, registerAudio, unregisterAudio]);

  const fadeToFull = useCallback(() => {
    fadeTo(getVolume(FULL_VOLUME), TRANSITION_FADE_DURATION);
  }, [fadeTo, getVolume]);

  const fadeToDistant = useCallback(() => {
    fadeTo(getVolume(DISTANT_VOLUME), TRANSITION_FADE_DURATION);
  }, [fadeTo, getVolume]);

  const fadeOut = useCallback((duration: number = DOOR_FADE_DURATION) => {
    if (!activeAudio) return;
    clearFadeInterval();

    const audio = activeAudio;
    const startVolume = audio.volume;
    const stepTime = duration / FADE_STEPS;
    let step = 0;

    activeFadeInterval = window.setInterval(() => {
      step++;
      if (step >= FADE_STEPS) {
        clearFadeInterval();
        if (registeredUnregister) registeredUnregister(audio);
        audio.pause();
        audio.currentTime = 0;
        activeAudio = null;
        activeFloor = null;
        registeredUnregister = null;
      } else {
        audio.volume = startVolume * (1 - step / FADE_STEPS);
      }
    }, stepTime);
  }, [clearFadeInterval]);

  const updateVolume = useCallback(() => {
    if (!activeAudio || activeFadeInterval) return;
    const isDistant = activeAudio.volume <= getVolume(DISTANT_VOLUME) + 0.01;
    activeAudio.volume = isDistant ? getVolume(DISTANT_VOLUME) : getVolume(FULL_VOLUME);
  }, [getVolume]);

  const muteTemporarily = useCallback(() => {
    if (!activeAudio) return;
    volumeBeforeMute = activeAudio.volume;
    fadeTo(0, MUTE_FADE_DURATION);
  }, [fadeTo]);

  const restoreFromMute = useCallback(() => {
    if (!activeAudio || volumeBeforeMute === null) return;
    fadeTo(volumeBeforeMute, MUTE_FADE_DURATION);
    volumeBeforeMute = null;
  }, [fadeTo]);

  return {
    startDistant,
    fadeToFull,
    fadeToDistant,
    fadeOut,
    updateVolume,
    muteTemporarily,
    restoreFromMute,
    currentFloor: activeFloor,
  };
}
