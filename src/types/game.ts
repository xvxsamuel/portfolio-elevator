export type SceneName = 'elevator' | 'loading' | 'title-screen' | 'floor-1' | 'floor-4' | 'floor-5' | 'floor-8';

export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  cursor?: string;
  onClick?: () => void;
}

export interface GameSettings {
  parallaxEnabled: boolean;
  masterVolume: number;
}

export interface DialogueData {
  text: string;
  speaker?: string;
  onComplete?: () => void;
}

export interface GameState {
  currentScene: SceneName;
  inventory: InventoryItem[];
  isLoading: boolean;
  loadingProgress: number;
  parallaxEnabled: boolean;
  masterVolume: number;
  modalOpen: boolean;
  dialogue: DialogueData | null;
  dialogueCount: number;
  playerName: string;
  currentFloor: number | null;
  debugMode: boolean;
}

export interface GameContextType extends GameState {
  setScene: (scene: SceneName) => void;
  addToInventory: (item: InventoryItem) => void;
  removeFromInventory: (itemId: string) => void;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setParallaxEnabled: (enabled: boolean) => void;
  setMasterVolume: (volume: number) => void;
  setModalOpen: (open: boolean) => void;
  showDialogue: (text: string, speaker?: string, onComplete?: () => void) => void;
  dismissDialogue: () => void;
  setPlayerName: (name: string) => void;
  setCurrentFloor: (floor: number | null) => void;
  setDebugMode: (enabled: boolean) => void;
}
