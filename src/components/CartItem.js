// components/CartItem.js
import { Component } from "../common/Component.js";

export class CartItem extends Component {
  render() {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerText = this.props.item ? this.props.item.title : "Cart Item";
    return el;
  }
}
