import { useState, useEffect, useRef } from 'react';

const imageModules = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,gif,webp}', { eager: true, query: '?url', import: 'default' });
const audioModules = import.meta.glob('../assets/audio/**/*.{mp3,wav,ogg}', { eager: true, query: '?url', import: 'default' });

const allImageUrls = Object.values(imageModules) as string[];
const allAudioUrls = Object.values(audioModules) as string[];
const allAssets = [...allImageUrls, ...allAudioUrls];

const imageCache: HTMLImageElement[] = [];
const audioCache: Map<string, HTMLAudioElement> = new Map();

export function getPreloadedAudio(src: string): HTMLAudioElement {
  const cached = audioCache.get(src);
  if (cached) {
    return cached;
  }
  const audio = new Audio(src);
  audio.preload = 'auto';
  audioCache.set(src, audio);
  return audio;
}

export function usePreloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

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
      audioCache.set(src, audio);
    });
  }, []);

  return { progress, isLoaded };
}
