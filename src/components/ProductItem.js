// components/ProductItem.js
import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.product = props.product;
    this.cartContext = props.cartContext;
    this.onSelectProduct = props.onSelectProduct;
  }

  render() {
    const el = document.createElement("div");
    el.className = "product-item";

    const img = document.createElement("img");
    img.className = "product-image";
    img.src = this.product.image;
    img.alt = this.product.title;
    img.addEventListener("click", () => {
      if (this.onSelectProduct) this.onSelectProduct(this.product);
    });

    const title = document.createElement("p");
    title.className = "product-title";
    title.textContent = this.product.title;
    title.addEventListener("click", () => {
      if (this.onSelectProduct) this.onSelectProduct(this.product);
    });

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = `$${this.product.price}`;

    const addBtn = document.createElement("button");
    addBtn.className = "btn add-to-cart";
    addBtn.textContent = "Add to Cart";
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.cartContext) {
        this.cartContext.addItem(this.product);
      }
    });

    el.appendChild(img);
    el.appendChild(title);
    el.appendChild(price);
    el.appendChild(addBtn);

    return el;
  }
}
