import { useGame } from '../../context/GameProvider';
import type { InventoryItem } from '../../types/game';
import styles from './InventoryBar.module.css';

interface InventorySlotProps {
  item?: InventoryItem;
  index: number;
}

function InventorySlot({ item, index }: InventorySlotProps) {
  return (
    <div className={styles.slot} data-index={index}>
      {item ? (
        <img
          src={item.icon}
          alt={item.name}
          className={styles.itemIcon}
          title={item.description}
        />
      ) : null}
    </div>
  );
}

const MAX_SLOTS = 6;

interface InventoryBarProps {
  visible?: boolean;
}

export function InventoryBar({ visible = true }: InventoryBarProps) {
  const { inventory } = useGame();

  const slots = Array.from({ length: MAX_SLOTS }, (_, i) => ({
    index: i,
    item: inventory[i],
  }));

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.slots}>
        {slots.map(({ index, item }) => (
          <InventorySlot key={index} index={index} item={item} />
        ))}
      </div>
    </div>
  );
}
