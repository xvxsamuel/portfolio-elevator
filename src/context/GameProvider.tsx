import { createContext, useContext, useState, useCallback, useMemo } from 'react';
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

  const showDialogueFunc = useCallback((text: string, speaker?: string, onComplete?: () => void) => {
    setDialogue({ text, speaker, onComplete });
    setDialogueCount(prev => prev + 1);
  }, []);

  const dismissDialogue = useCallback(() => {
    setDialogue(prev => {
      prev?.onComplete?.();
      return null;
    });
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
  }), [currentScene, inventory, isLoading, loadingProgress, parallaxEnabled, masterVolume, modalOpen, dialogue, dialogueCount, playerName, currentFloor, debugMode, setScene, addToInventory, removeFromInventory, setLoading, setParallaxEnabled, setMasterVolume, setModalOpen, showDialogueFunc, dismissDialogue, setPlayerName, setCurrentFloor, setDebugMode]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
