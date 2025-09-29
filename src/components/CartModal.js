// components/CartModal.js
import { Component } from "../common/Component.js";

export class CartModal extends Component {
  constructor(props) {
    super(props);
    this.cartContext = props?.cartContext;
    this.modalEl = null;
  }

  open() {
    this.updateContent();
    this.modalEl.classList.add("open");
  }

  close() {
    this.modalEl.classList.remove("open");
  }

  updateContent() {
    const list = this.listEl;
    list.innerHTML = "";

    if (!this.cartContext || this.cartContext.items.length === 0) {
      list.innerHTML = "<p>Your cart is empty</p>";
      this.totalEl.textContent = "";
      return;
    }

    this.cartContext.items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-row";

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.className = "cart-item-img";

      const info = document.createElement("div");
      info.className = "cart-item-info";
      const title = document.createElement("p");
      title.textContent = item.title;
      title.className = "cart-item-title";
      const price = document.createElement("p");
      price.textContent = `$${item.price}`;
      price.className = "cart-item-price";
      info.appendChild(title);
      info.appendChild(price);

      const controls = document.createElement("div");
      controls.className = "cart-item-controls";
      const minusBtn = document.createElement("button");
      minusBtn.textContent = "-";
      minusBtn.addEventListener("click", () => {
        this.cartContext.decreaseQuantity(item.id);
        this.updateContent();
      });
      const qty = document.createElement("span");
      qty.textContent = item.quantity;
      const plusBtn = document.createElement("button");
      plusBtn.textContent = "+";
      plusBtn.addEventListener("click", () => {
        this.cartContext.increaseQuantity(item.id);
        this.updateContent();
      });
      controls.appendChild(minusBtn);
      controls.appendChild(qty);
      controls.appendChild(plusBtn);

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.appendChild(document.createTextNode("Remove"));
      removeBtn.addEventListener("click", () => {
        this.cartContext.removeItem(item.id);
        this.updateContent();
      });

      row.appendChild(img);
      row.appendChild(info);
      row.appendChild(controls);
      row.appendChild(removeBtn);

      list.appendChild(row);
    });

    const totalItems = this.cartContext.getTotalCount();
    const totalPrice = this.cartContext.items
      .reduce((sum, i) => sum + i.price * i.quantity, 0)
      .toFixed(2);

    this.totalEl.textContent = `Total Items: ${totalItems} | Total Price: $${totalPrice}`;
  }

  render() {
    this.modalEl = document.createElement("div");
    this.modalEl.className = "cart-modal";

    const content = document.createElement("div");
    content.className = "cart-modal-content";

    const closeBtn = document.createElement("span");
    closeBtn.className = "cart-modal-close";
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => this.close());

    this.listEl = document.createElement("div");
    this.listEl.className = "cart-list";

    this.totalEl = document.createElement("div");
    this.totalEl.className = "cart-total";

    content.appendChild(closeBtn);
    content.appendChild(this.listEl);
    content.appendChild(this.totalEl);
    this.modalEl.appendChild(content);

    return this.modalEl;
  }

  componentDidMount() {
    if (this.cartContext) {
      this.cartContext.subscribe(() => this.updateContent());
    }
  }
}
