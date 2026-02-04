import { useState, useEffect } from 'react';

const imageModules = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,gif,webp}', { eager: true, query: '?url', import: 'default' });
const audioModules = import.meta.glob('../assets/audio/**/*.{mp3,wav,ogg}', { eager: true, query: '?url', import: 'default' });

const allAssets = [...Object.values(imageModules), ...Object.values(audioModules)] as string[];

export function usePreloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (allAssets.length === 0) {
      setIsLoaded(true);
      return;
    }

    let loaded = 0;
    const total = allAssets.length;

    allAssets.forEach(src => {
      const isAudio = /\.(mp3|wav|ogg)$/i.test(src);
      const el = isAudio ? new Audio() : new Image();
      
      const onDone = () => {
        loaded++;
        setProgress(Math.round((loaded / total) * 100));
        if (loaded === total) setIsLoaded(true);
      };

      if (isAudio) {
        (el as HTMLAudioElement).oncanplaythrough = onDone;
      } else {
        (el as HTMLImageElement).onload = onDone;
      }
      el.onerror = onDone;
      el.src = src;
    });
  }, []);

  return { progress, isLoaded };
}
