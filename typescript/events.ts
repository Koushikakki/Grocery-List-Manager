import { renderList } from "./main";
import { GroceryItem } from "./types";
import { loadFromStorage, saveToStorage } from "./localstorage";



export function AddItem(item: GroceryItem): void {
  const items = loadFromStorage();
  items.push(item);
  saveToStorage(items);
  renderList(items);
  
}

export function RemoveItem(id: string): void {
  const items = loadFromStorage().filter(item => item.id !== id);
  saveToStorage(items);
  renderList(items);
}

export function TogglePurchased(id: string): void {
  const items = loadFromStorage() as GroceryItem[]; 
  const item = items.find(i => i.id === id);
  if (item) item.purchased = !item.purchased;
  saveToStorage(items);
  renderList(items);
}