import rosaryIcon from '../assets/images/interiors/martina/rosary-item.png';
import urnIcon from '../assets/images/interiors/julie/urn-item.png';
import maskIcon from '../assets/images/interiors/samuel/mask.png';
import polaroidIcon from '../assets/images/interiors/laura/Polaroid.png';
import type { InventoryItem } from '../types/game';

export type ItemId = 'rosary' | 'urn' | 'polaroid' | 'mask';

export const ITEMS: Record<ItemId, InventoryItem> = {
  rosary: {
    id: 'rosary',
    name: 'Ominous Rosary',
    icon: rosaryIcon,
    description: 'Beads of questionable spiritual origin.',
  },
  urn: {
    id: 'urn',
    name: 'Soul Urn',
    icon: urnIcon,
    description: 'Suitable for rituals. Lightly used.',
  },
  polaroid: {
    id: 'polaroid',
    name: 'Distressing Polaroid',
    icon: polaroidIcon,
    description: 'Friendly guy.',
  },
  mask: {
    id: 'mask',
    name: 'Shaman Mask',
    icon: maskIcon,
    description: 'Since way back, shamans been dey use dis mask for generations dem.',
  },
};
