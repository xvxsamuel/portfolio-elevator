import { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameProvider';

const imageModules = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,gif,webp}', { eager: true, query: '?url', import: 'default' });
const audioModules = import.meta.glob('../assets/audio/**/*.{mp3,wav,ogg}', { eager: true, query: '?url', import: 'default' });

const allImageUrls = Object.values(imageModules) as string[];
const allAudioUrls = Object.values(audioModules) as string[];
const allAssets = [...allImageUrls, ...allAudioUrls];

const imageCache: HTMLImageElement[] = [];
const audioCache: HTMLAudioElement[] = [];

export function usePreloader() {
  const { debugMode } = useGame();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    if (debugMode) {
      setProgress(100);
      setIsLoaded(true);
      return;
    }

    if (allAssets.length === 0) {
      setIsLoaded(true);
      return;
    }

    let loaded = 0;
    const total = allAssets.length;

    allImageUrls.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        setProgress(Math.round((loaded / total) * 100));
        if (loaded === total) setIsLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        setProgress(Math.round((loaded / total) * 100));
        if (loaded === total) setIsLoaded(true);
      };
      img.src = src;
      imageCache.push(img);
    });

    allAudioUrls.forEach(src => {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.oncanplaythrough = () => {
        loaded++;
        setProgress(Math.round((loaded / total) * 100));
        if (loaded === total) setIsLoaded(true);
      };
      audio.onerror = () => {
        loaded++;
        setProgress(Math.round((loaded / total) * 100));
        if (loaded === total) setIsLoaded(true);
      };
      audio.src = src;
      audioCache.push(audio);
    });
  }, []);

  return { progress, isLoaded };
}
