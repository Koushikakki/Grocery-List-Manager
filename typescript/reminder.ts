import { GroceryItem } from './types';

export function scheduleReminder(item: GroceryItem): void {
  if (!item.reminderMinutes) return;
  setTimeout(() => {
    alert(` Reminder: Pick up ${item.name}!`);
  }, item.reminderMinutes * 60 * 1000);
}