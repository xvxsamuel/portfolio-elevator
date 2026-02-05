import { useCallback } from 'react';
import { useGame } from '../context/GameProvider';
import { ITEMS } from '../data/items';

export function useInventory() {
  const { inventory, addToInventory, removeFromInventory } = useGame();

  const hasItem = useCallback((itemId: string) => {
    return inventory.some(item => item.id === itemId);
  }, [inventory]);

  const addItem = useCallback((itemId: string) => {
    const item = ITEMS[itemId];
    if (item && !hasItem(itemId)) {
      addToInventory(item);
      return true;
    }
    return false;
  }, [addToInventory, hasItem]);

  const removeItem = useCallback((itemId: string) => {
    if (hasItem(itemId)) {
      removeFromInventory(itemId);
      return true;
    }
    return false;
  }, [removeFromInventory, hasItem]);

  return {
    inventory,
    hasItem,
    addItem,
    removeItem,
  };
}
