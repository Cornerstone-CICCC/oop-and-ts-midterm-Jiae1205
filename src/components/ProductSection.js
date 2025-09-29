// components/ProductSection.js
import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductSection extends Component {
  constructor(props) {
    super(props);
    this.title = props?.title || "Products";
    this.products = props?.products || [];
    this.cartContext = props?.cartContext;
    this.onSelectProduct = props?.onSelectProduct;
    this.visibleCount = props?.visibleCount || 3;
    this.currentIndex = 0;
  }

  next() {
    if (this.currentIndex < Math.max(0, this.products.length - this.visibleCount)) {
      this.currentIndex++;
      this.updateSlide();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlide();
    }
  }

  updateSlide() {
    if (this.slideWrapper) {
      const translatePercent = -(this.currentIndex * (100 / this.visibleCount));
      this.slideWrapper.style.transform = `translateX(${translatePercent}%)`;
    }
  }

  render() {
    const container = document.createElement("section");
    container.className = "product-section";

    const header = document.createElement("div");
    header.className = "section-header";
    const titleEl = document.createElement("h2");
    titleEl.textContent = this.title;
    header.appendChild(titleEl);

    // controls
    const controls = document.createElement("div");
    controls.className = "section-controls";
    const prevBtn = document.createElement("button");
    prevBtn.className = "section-prev";
    prevBtn.textContent = "<";
    prevBtn.addEventListener("click", () => this.prev());
    const nextBtn = document.createElement("button");
    nextBtn.className = "section-next";
    nextBtn.textContent = ">";
    nextBtn.addEventListener("click", () => this.next());

    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);
    header.appendChild(controls);

    container.appendChild(header);

    const slider = document.createElement("div");
    slider.className = "product-section-slider";

    this.slideWrapper = document.createElement("div");
    this.slideWrapper.className = "product-section-wrapper";
    // 스타일로 너비 제어 — 자식들이 일정 비율 차지하도록 CSS에서 처리

    this.products.forEach((product) => {
      const item = new ProductItem({
        product,
        cartContext: this.cartContext,
        onSelectProduct: this.onSelectProduct
      });
      item.mount(this.slideWrapper);
    });

    slider.appendChild(this.slideWrapper);
    container.appendChild(slider);

    return container;
  }
}
