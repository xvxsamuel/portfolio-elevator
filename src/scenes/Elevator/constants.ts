import martinaBg from '../../assets/images/interiors/martina/main.png';
import julieBg from '../../assets/images/interiors/julie/main.png';
import lauraBg from '../../assets/images/interiors/laura/main.png';
import samuelBg from '../../assets/images/interiors/samuel/main.png';

export const FLOOR_SCENES: Record<number, string> = {
  1: martinaBg,
  4: julieBg,
  5: lauraBg,
  8: samuelBg,
};

export const FLOOR_ENTRY_POSITIONS: Record<number, string> = {
  1: '140% -80%',
  4: '250% -78%',
  5: 'center',
  8: '115% -80%',
};

export const REAL_FLOORS = [1, 4, 5, 8];
export const MIN_MOVE_DURATION = 6000;
export const MAX_MOVE_DURATION = 14000;
export const DOOR_OPEN_DELAY = 1500;
export const DOOR_ANIMATION_DURATION = 2000;
