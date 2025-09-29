// components/Header.js
import { Component } from "../common/Component.js";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.onCartClick = props?.onCartClick;
    this.cartContext = props?.cartContext;
  }

  render() {
    const el = document.createElement("header");
    el.className = "header";

    const logo = document.createElement("div");
    logo.className = "logo-container";
    logo.textContent = "My Fake Shop";

    const icons = document.createElement("div");
    icons.className = "icons-container";

    const cartIcon = document.createElement("i");
    cartIcon.className = "fa fa-shopping-cart cart-icon";
    cartIcon.style.cursor = "pointer";

    cartIcon.addEventListener("click", () => {
      if (this.onCartClick) this.onCartClick();
    });

    this.badgeEl = document.createElement("span");
    this.badgeEl.className = "cart-badge";
    this.badgeEl.textContent = "0";

    cartIcon.appendChild(this.badgeEl);
    icons.appendChild(cartIcon);

    el.appendChild(logo);
    el.appendChild(icons);

    return el;
  }

  updateBadge() {
    if (this.cartContext) {
      const count = this.cartContext.getTotalCount();
      this.badgeEl.textContent = count;
      this.badgeEl.style.display = count > 0 ? "inline-block" : "none";
    }
  }

  componentDidMount() {
    if (this.cartContext) {
      this.cartContext.subscribe(() => this.updateBadge());
      this.updateBadge();
    }
  }
}
