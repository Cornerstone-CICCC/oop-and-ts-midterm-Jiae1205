// components/ProductModal.js
import { Component } from "../common/Component.js";

export class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.cartContext = props?.cartContext;
    this.product = null;
  }

  open(product) {
    this.product = product;
    if (!this.modalEl) return;
    this.updateContent();
    this.modalEl.classList.add("open");
  }

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove("open");
  }

  updateContent() {
    if (!this.product) return;
    this.imgEl.src = this.product.image;
    this.imgEl.alt = this.product.title;
    this.titleEl.textContent = this.product.title;
    this.priceEl.textContent = `$${this.product.price}`;
    this.descEl.textContent = this.product.description;
  }

  render() {
    this.modalEl = document.createElement("div");
    this.modalEl.className = "modal";

    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => this.close());

    this.imgEl = document.createElement("img");
    this.imgEl.className = "modal-image";

    this.titleEl = document.createElement("h2");
    this.priceEl = document.createElement("p");
    this.priceEl.className = "modal-price";
    this.descEl = document.createElement("p");
    this.descEl.className = "modal-desc";

    const addBtn = document.createElement("button");
    addBtn.className = "btn add-to-cart";
    addBtn.textContent = "Add to Cart";
    addBtn.addEventListener("click", () => {
      if (this.cartContext && this.product) {
        this.cartContext.addItem(this.product);
      }
    });

    content.appendChild(closeBtn);
    content.appendChild(this.imgEl);
    content.appendChild(this.titleEl);
    content.appendChild(this.priceEl);
    content.appendChild(this.descEl);
    content.appendChild(addBtn);

    this.modalEl.appendChild(content);
    return this.modalEl;
  }
}
