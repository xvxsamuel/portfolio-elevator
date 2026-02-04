import martinaBg from '../../assets/images/interiors/martina/main.png';
import julieBg from '../../assets/images/interiors/julie/main.png';
import lauraBg from '../../assets/images/interiors/laura/main.png';
import samuelBg from '../../assets/images/interiors/samuel/main.png';
import type { EntryPoint } from '../../components/Scene';

export const FLOOR_SCENES: Record<number, string> = {
  1: martinaBg,
  4: julieBg,
  5: lauraBg,
  8: samuelBg,
};

export const FLOOR_ENTRY_POINTS: Record<number, EntryPoint> = {
  1: 'right',
  4: 'right',
  5: 'center',
  8: 'right',
};

export const REAL_FLOORS = [1, 4, 5, 8];
export const MIN_MOVE_DURATION = 6000;
export const MAX_MOVE_DURATION = 14000;
export const DOOR_OPEN_DELAY = 1500;
export const DOOR_ANIMATION_DURATION = 2500;
