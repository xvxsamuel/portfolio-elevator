import { useState } from 'react';
import { useGame } from '../../context/GameProvider';
import type { InventoryItem } from '../../types/game';
import styles from './InventoryBar.module.css';

interface InventorySlotProps {
  item?: InventoryItem;
  index: number;
  onHover: (item: InventoryItem | null) => void;
}

function InventorySlot({ item, index, onHover }: InventorySlotProps) {
  return (
    <div 
      className={styles.slot} 
      data-index={index}
      onMouseEnter={() => item && onHover(item)}
      onMouseLeave={() => onHover(null)}
    >
      {item ? (
        <img
          src={item.icon}
          alt={item.name}
          className={styles.itemIcon}
        />
      ) : null}
    </div>
  );
}

const MAX_SLOTS = 4;

interface InventoryBarProps {
  visible?: boolean;
}

export function InventoryBar({ visible = true }: InventoryBarProps) {
  const { inventory } = useGame();
  const [hoveredItem, setHoveredItem] = useState<InventoryItem | null>(null);

  const slots = Array.from({ length: MAX_SLOTS }, (_, i) => ({
    index: i,
    item: inventory[i],
  }));

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
        {slots.map(({ index, item }) => (
          <InventorySlot key={index} index={index} item={item} onHover={setHoveredItem} />
        ))}
      </div>
    </div>
  );
}
