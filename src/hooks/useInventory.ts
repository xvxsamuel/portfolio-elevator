import { useCallback } from 'react';
import { useGame } from '../context/GameProvider';
import type { ItemId } from '../data/items';
import { ITEMS } from '../data/items';

export function useInventory() {
  const { inventory, addToInventory, removeFromInventory } = useGame();

  const hasItem = useCallback((itemId: ItemId) => {
    return inventory.some(item => item.id === itemId);
  }, [inventory]);

  const addItem = useCallback((itemId: ItemId) => {
    const item = ITEMS[itemId];
    if (item && !hasItem(itemId)) {
      addToInventory(item);
    }
  }, [addToInventory, hasItem]);

  const removeItem = useCallback((itemId: ItemId) => {
    if (hasItem(itemId)) {
      removeFromInventory(itemId);
    }
  }, [removeFromInventory, hasItem]);

  return { inventory, hasItem, addItem, removeItem };
}
