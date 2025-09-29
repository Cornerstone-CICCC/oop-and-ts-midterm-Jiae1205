// contexts/CartContext.js
export class CartContext {
  constructor() {
    this.items = [];
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach((l) => l());
  }

  addItem(product) {
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.notify();
  }

  removeItem(id) {
    this.items = this.items.filter((i) => i.id !== id);
    this.notify();
  }

  increaseQuantity(id) {
    const item = this.items.find((i) => i.id === id);
    if (item) item.quantity++;
    this.notify();
  }

  decreaseQuantity(id) {
    const item = this.items.find((i) => i.id === id);
    if (item && item.quantity > 1) item.quantity--;
    else this.removeItem(id);
    this.notify();
  }

  getTotalCount() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  getItems() {
    return this.items;
  }
}
