// components/CartList.js
import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.items = []; // [{id, title, price, image, quantity}]
  }

  addProduct(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.update();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) this.removeProduct(productId);
    }
    this.update();
  }

  removeProduct(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.update();
  }

  getTotalItems() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  getTotalPrice() {
    return this.items
      .reduce((sum, i) => sum + i.price * i.quantity, 0)
      .toFixed(2);
  }

  render() {
    const el = document.createElement("div");
    el.className = "cart-list";

    if (this.items.length === 0) {
      el.textContent = "🛒 Your cart is empty";
    } else {
      this.items.forEach(item => {
        new CartItem({
          item,
          onUpdateQuantity: (qty) => this.updateQuantity(item.id, qty),
          onRemove: () => this.removeProduct(item.id),
        }).mount(el);
      });

      const summary = document.createElement("div");
      summary.className = "cart-summary";
      summary.innerHTML = `
        <hr />
        <p>Total Items: ${this.getTotalItems()}</p>
        <p>Total Price: $${this.getTotalPrice()}</p>
      `;
      el.appendChild(summary);
    }

    return el;
  }
}
