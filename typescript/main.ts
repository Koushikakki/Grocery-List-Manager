import { GroceryItem } from './types';
import { applyFilter } from './filter';
import { AddItem } from './events';
import { loadFromStorage } from './localstorage';



export function renderList(items: GroceryItem[]): void {
  const list = document.getElementById('grocery-list') as HTMLUListElement;
  const total = document.getElementById('total-count')!;
  const remaining = document.getElementById('remaining-count')!;

  list.innerHTML = '';

  items.sort((a, b) => Number(b.highPriority) - Number(a.highPriority)).forEach(item => {
      const li = document.createElement('li');
      li.className = item.purchased ? 'purchased' : '';
      li.innerHTML = `
        <input type="checkbox" data-id="${item.id}" ${item.purchased ? 'checked' : ''} />
        <span>${item.name} (${item.quantity}) - ${item.category}${item.highPriority ? ' 🔥' : ''}</span>
        <button data-remove="${item.id}">Remove</button>
      `;
      list.appendChild(li);
    });

  total.textContent = `${items.length}`;
  remaining.textContent = `${items.filter(item => !item.purchased).length}`;
}



function setupEventHandlers(): void {
  const form = document.getElementById('grocery-form') as HTMLFormElement;

  form.onsubmit = (e) => {
    e.preventDefault();
    const name = (document.getElementById('item-name') as HTMLInputElement).value.trim();
    const qty = +(document.getElementById('item-quantity') as HTMLInputElement).value;
    const cat = (document.getElementById('item-category') as HTMLSelectElement).value;
    const high = (document.getElementById('item-priority') as HTMLInputElement).checked;
    const reminder = +(document.getElementById('reminder-time') as HTMLInputElement).value;

    if (!name || qty < 1 || !cat) return;

    const item: GroceryItem = {
      id: crypto.randomUUID(),
      name,
      quantity: qty,
      category: cat,
      purchased: false,
      highPriority: high,
      reminderMinutes: reminder > 0 ? reminder : undefined,
      createdAt: Date.now()
    };

    AddItem(item);
    form.reset();
    
  };

}













document.addEventListener('DOMContentLoaded', () => {
  
  setupEventHandlers();
  renderList(loadFromStorage());
});
