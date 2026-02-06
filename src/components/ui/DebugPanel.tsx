import { useGame } from '../../context/GameProvider';
import { ITEMS } from '../../data/items';
import styles from './DebugPanel.module.css';

export function DebugPanel() {
  const { showHotspots, setShowHotspots, inventory, addToInventory, setPlayerName, debugMode } = useGame();

  if (!debugMode) return null;

  const hasAllItems = Object.keys(ITEMS).every(
    itemId => inventory.some(item => item.id === itemId)
  );

  const handleAddItems = () => {
    if (hasAllItems) return;
    setPlayerName('debug');
    Object.values(ITEMS).forEach(item => {
      if (!inventory.some(i => i.id === item.id)) {
        addToInventory(item);
      }
    });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.title}>Debug</div>
      <button
        className={`${styles.button} ${showHotspots ? styles.buttonActive : ''}`}
        onClick={() => setShowHotspots(!showHotspots)}
      >
        {showHotspots ? 'Hide Hotspots' : 'Show Hotspots'}
      </button>
      <button
        className={`${styles.button} ${hasAllItems ? styles.buttonActive : ''}`}
        onClick={handleAddItems}
        disabled={hasAllItems}
      >
        {hasAllItems ? 'Items Added' : 'Add All Items'}
      </button>
    </div>
  );
}
