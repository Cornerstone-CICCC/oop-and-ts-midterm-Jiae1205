// components/FeaturedSlider.js
import { Component } from "../common/Component.js";

export class FeaturedSlider extends Component {
  constructor(props) {
    super(props);
    this.products = props?.featuredProducts || [];
    this.onSelectProduct = props?.onSelectProduct;
    this.currentIndex = 0;
    this.interval = null;
  }

  render() {
    const container = document.createElement("div");
    container.className = "slider";

    this.slides = this.products.map((product, index) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      if (index === 0) slide.classList.add("active");

      const img = document.createElement("img");
      img.className = "slide-image";
      img.src = product.image;
      img.alt = product.title;
      img.addEventListener("click", () => {
        if (this.onSelectProduct) this.onSelectProduct(product);
      });

      slide.appendChild(img);
      container.appendChild(slide);
      return slide;
    });

    this.startAutoSlide();
    return container;
  }

  startAutoSlide() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (!this.slides || this.slides.length === 0) return;
      this.slides[this.currentIndex].classList.remove("active");
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.slides[this.currentIndex].classList.add("active");
    }, 3000);
  }

  componentDidUpdate() {
    this.startAutoSlide();
  }

  componentDidMount() {
    this.startAutoSlide();
  }
}
