// components/ProductList.js
import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.products = props.products || [];
    this.cartContext = props.cartContext;
    this.onSelectProduct = props.onSelectProduct;
  }

  render() {
    const el = document.createElement("div");
    el.className = "product-list";

    if (!this.products || this.products.length === 0) {
      el.innerText = "Loading products...";
      return el;
    }

    this.products.forEach(product => {
      const item = new ProductItem({
        product,
        cartContext: this.cartContext,
        onSelectProduct: this.onSelectProduct
      });
      item.mount(el);
    });

    return el;
  }
}
