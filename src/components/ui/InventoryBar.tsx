import { useState } from 'react';
import { useGame } from '../../context/GameProvider';
import type { InventoryItem } from '../../types/game';
import styles from './InventoryBar.module.css';

interface InventorySlotProps {
  item?: InventoryItem;
  onHover: (item: InventoryItem | null) => void;
  glowing?: boolean;
  hidden?: boolean;
}

function InventorySlot({ item, onHover, glowing, hidden }: InventorySlotProps) {
  return (
    <div 
      className={`${styles.slot} ${glowing ? styles.slotGlowing : ''}`}
      onMouseEnter={() => item && onHover(item)}
      onMouseLeave={() => onHover(null)}
    >
      {item && <img src={item.icon} alt={item.name} className={`${styles.itemIcon} ${hidden ? styles.itemHidden : ''}`} />}
    </div>
  );
}

const MAX_SLOTS = 4;

interface InventoryBarProps {
  visible?: boolean;
  glowingSlots?: number[];
  hiddenSlots?: number[];
}

export function InventoryBar({ visible = true, glowingSlots = [], hiddenSlots = [] }: InventoryBarProps) {
  const { inventory } = useGame();
  const [hoveredItem, setHoveredItem] = useState<InventoryItem | null>(null);

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : styles.hidden}`}>
      {hoveredItem && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipName}>{hoveredItem.name}</div>
          {hoveredItem.description && (
            <div className={styles.tooltipDesc}>{hoveredItem.description}</div>
          )}
        </div>
      )}
      <div className={styles.slots}>
        {Array.from({ length: MAX_SLOTS }, (_, i) => (
          <InventorySlot 
            key={i} 
            item={inventory[i]} 
            onHover={setHoveredItem}
            glowing={glowingSlots.includes(i)}
            hidden={hiddenSlots.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}
