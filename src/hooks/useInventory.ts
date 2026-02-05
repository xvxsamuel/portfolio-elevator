import { useCallback } from 'react';
import { useGame } from '../context/GameProvider';
import { ITEMS, ItemId } from '../data/items';

export function useInventory() {
  const { inventory, addToInventory, removeFromInventory } = useGame();

  const hasItem = useCallback((itemId: ItemId) => {
    return inventory.some(item => item.id === itemId);
  }, [inventory]);

  const addItem = useCallback((itemId: ItemId) => {
    const item = ITEMS[itemId];
    if (item && !hasItem(itemId)) {
      addToInventory(item);
      return true;
    }
    return false;
  }, [addToInventory, hasItem]);

  const removeItem = useCallback((itemId: ItemId) => {
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
