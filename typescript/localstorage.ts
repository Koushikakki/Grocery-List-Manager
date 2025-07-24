import { GroceryItem } from './types';
import { STORAGE_KEY } from './key';

export function loadFromStorage(): GroceryItem[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? (JSON.parse(data) as GroceryItem[]) : [];
}

export function saveToStorage(items: GroceryItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
