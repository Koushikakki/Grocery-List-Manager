import { GroceryItem } from './types';
import { loadFromStorage } from './localstorage';
import { renderList } from './main';

export function filterItems(items: GroceryItem[], search: string, category: string): GroceryItem[] {
  return items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || item.category === category;
    return matchesSearch && matchesCategory;
  });
}


export function applyFilter(): void {
  const search = (document.getElementById('search') as HTMLInputElement).value;
  const cat = (document.getElementById('category-filter') as HTMLSelectElement).value;
  const items = loadFromStorage();
  const filtered = filterItems(items, search, cat);
  renderList(filtered);
}