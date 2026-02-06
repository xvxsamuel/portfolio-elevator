import { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import type { SceneName, InventoryItem, GameContextType, DialogueData } from '../types/game';


const GameContext = createContext<GameContextType | null>(null);

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

interface GameProviderProps {
  children: ReactNode;
}

const getStoredValue = <T,>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  if (stored === null) return defaultValue;
  try {
    return JSON.parse(stored) as T;
  } catch {
    return defaultValue;
  }
};

const getInitialDebugMode = (): boolean => {
  const envDebug = import.meta.env.VITE_DEBUG_MODE === 'true';
  if (envDebug) return true;
  return getStoredValue('debugMode', false);
};

export function GameProvider({ children }: GameProviderProps) {
  const [currentScene, setCurrentScene] = useState<SceneName>('loading');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [parallaxEnabled, setParallaxEnabledState] = useState(() => getStoredValue('parallaxEnabled', true));
  const [masterVolume, setMasterVolumeState] = useState(() => getStoredValue('masterVolume', 100));
  const [modalOpen, setModalOpenState] = useState(false);
  const [dialogue, setDialogue] = useState<DialogueData | null>(null);
  const [dialogueCount, setDialogueCount] = useState(0);
  const [playerName, setPlayerNameState] = useState('');
  const [currentFloor, setCurrentFloorState] = useState<number | null>(null);
  const [debugMode, setDebugModeState] = useState(getInitialDebugMode);
  const [showHotspots, setShowHotspotsState] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const registeredAudios = useRef<Set<HTMLAudioElement>>(new Set());
  const pausedAudios = useRef<Set<HTMLAudioElement>>(new Set());

  const setScene = useCallback((scene: SceneName) => {
    setCurrentScene(scene);
  }, []);

  const addToInventory = useCallback((item: InventoryItem) => {
    setInventory((prev) => [...prev, item]);
  }, []);

  const removeFromInventory = useCallback((itemId: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const setParallaxEnabled = useCallback((enabled: boolean) => {
    setParallaxEnabledState(enabled);
    localStorage.setItem('parallaxEnabled', JSON.stringify(enabled));
  }, []);

  const setMasterVolume = useCallback((volume: number) => {
    setMasterVolumeState(volume);
    localStorage.setItem('masterVolume', JSON.stringify(volume));
  }, []);

  const setModalOpen = useCallback((open: boolean) => {
    setModalOpenState(open);
  }, []);

  const dialogueRef = useRef<{ text: string; speaker?: string; onComplete?: () => void } | null>(null);

  const showDialogueFunc = useCallback((text: string, speaker?: string, onComplete?: () => void) => {
    const dialogueData = { text, speaker, onComplete };
    dialogueRef.current = dialogueData;
    setDialogue(dialogueData);
    setDialogueCount(prev => prev + 1);
  }, []);

  const dismissDialogue = useCallback(() => {
    const callback = dialogueRef.current?.onComplete;
    dialogueRef.current = null;
    setDialogue(null);
    callback?.();
  }, []);

  const setPlayerName = useCallback((name: string) => {
    setPlayerNameState(name);
  }, []);

  const setCurrentFloor = useCallback((floor: number | null) => {
    setCurrentFloorState(floor);
  }, []);

  const setDebugMode = useCallback((enabled: boolean) => {
    setDebugModeState(enabled);
    localStorage.setItem('debugMode', JSON.stringify(enabled));
  }, []);

  const setShowHotspots = useCallback((enabled: boolean) => {
    setShowHotspotsState(enabled);
  }, []);

  const resetGameState = useCallback(() => {
    setInventory([]);
    setPlayerNameState('');
    setCurrentFloorState(null);
    setDialogue(null);
    setDialogueCount(0);
  }, []);

  const registerAudio = useCallback((audio: HTMLAudioElement) => {
    registeredAudios.current.add(audio);
  }, []);

  const unregisterAudio = useCallback((audio: HTMLAudioElement) => {
    registeredAudios.current.delete(audio);
    pausedAudios.current.delete(audio);
  }, []);

  const pauseAllAudio = useCallback(() => {
    setIsPaused(true);
    pausedAudios.current.clear();
    registeredAudios.current.forEach(audio => {
      if (!audio.paused) {
        pausedAudios.current.add(audio);
        audio.pause();
      }
    });
  }, []);

  const resumeAllAudio = useCallback(() => {
    setIsPaused(false);
    pausedAudios.current.forEach(audio => {
      audio.play().catch(() => {});
    });
    pausedAudios.current.clear();
  }, []);

  const stopAllAudio = useCallback(() => {
    setIsPaused(false);
    registeredAudios.current.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    registeredAudios.current.clear();
    pausedAudios.current.clear();
  }, []);

  const value: GameContextType = useMemo(() => ({
    currentScene,
    inventory,
    isLoading,
    loadingProgress,
    parallaxEnabled,
    masterVolume,
    modalOpen,
    dialogue,
    dialogueCount,
    playerName,
    currentFloor,
    debugMode,
    showHotspots,
    isPaused,
    setScene,
    addToInventory,
    removeFromInventory,
    setLoading,
    setLoadingProgress,
    setParallaxEnabled,
    setMasterVolume,
    setModalOpen,
    showDialogue: showDialogueFunc,
    dismissDialogue,
    setPlayerName,
    setCurrentFloor,
    setDebugMode,
    setShowHotspots,
    resetGameState,
    registerAudio,
    unregisterAudio,
    pauseAllAudio,
    resumeAllAudio,
    stopAllAudio,
  }), [currentScene, inventory, isLoading, loadingProgress, parallaxEnabled, masterVolume, modalOpen, dialogue, dialogueCount, playerName, currentFloor, debugMode, showHotspots, isPaused, setScene, addToInventory, removeFromInventory, setLoading, setParallaxEnabled, setMasterVolume, setModalOpen, showDialogueFunc, dismissDialogue, setPlayerName, setCurrentFloor, setDebugMode, setShowHotspots, resetGameState, registerAudio, unregisterAudio, pauseAllAudio, resumeAllAudio, stopAllAudio]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
