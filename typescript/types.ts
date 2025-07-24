export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  highPriority: boolean;
  purchased: boolean;
  reminderMinutes?: number;
  createdAt: number;
}