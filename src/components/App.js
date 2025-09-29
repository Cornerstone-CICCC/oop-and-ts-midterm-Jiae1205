// components/App.js
import { Component } from "../common/Component.js";
import { Header } from "./Header.js";
import { CartModal } from "./CartModal.js";
import { SearchBar } from "./SearchBar.js";
import { CategoryList } from "./CategoryList.js";
import { FeaturedSlider } from "./FeaturedSlider.js";
import { ProductModal } from "./ProductModal.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";
import { Footer } from "./Footer.js";
import { CartContext } from "../contexts/CartContext.js";
import { ProductSection } from "./ProductSection.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.cartContext = props?.cartContext || new CartContext();

    this.productModal = new ProductModal({ cartContext: this.cartContext });
    this.cartModal = new CartModal({ cartContext: this.cartContext });

    this.state = { categories: [], featured: [], products: [] };
    this.products = [];
  }

  async componentDidMount() {
    try {
      const catRes = await fetch("https://fakestoreapi.com/products/categories");
      const categories = await catRes.json();
      this.setState({ categories });

      const prodRes = await fetch("https://fakestoreapi.com/products");
      const products = await prodRes.json();
      this.products = products;
      const featured = products.slice(0, 4);
      this.setState({ featured, products });

      // 모달 한 번만 mount
      this.productModal.mount(document.body);
      this.cartModal.mount(document.body);
    } catch (err) {
      console.error("API load failed", err);
    }
  }

  handleSelectCategory = (category) => {
    if (!category) {
      this.setState({ products: this.products });
      return;
    }
    const filtered = this.products.filter((p) => p.category === category);
    this.setState({ products: filtered });
  };

  render() {
    const appContainer = document.createElement("div");
    appContainer.className = "app-container";

    new Header({
      cartContext: this.cartContext,
      onCartClick: () => this.cartModal.open()
    }).mount(appContainer);

    new SearchBar().mount(appContainer);

    new CategoryList({
      categories: this.state.categories,
      onSelectCategory: (cat) => this.handleSelectCategory(cat)
    }).mount(appContainer);

    // Featured Slider
    new FeaturedSlider({
      featuredProducts: this.state.featured,
      onSelectProduct: (p) => this.productModal.open(p)
    }).mount(appContainer);

    // Today's Deal
    new ProductSection({
      title: "Today's Deal",
      products: this.products.slice(0, 6),
      visibleCount: 3,
      cartContext: this.cartContext,
      onSelectProduct: (p) => this.productModal.open(p)
    }).mount(appContainer);

    // Just For You
    new ProductSection({
      title: "Just For You",
      products: this.products.slice(7, 12),
      visibleCount: 4,
      cartContext: this.cartContext,
      onSelectProduct: (p) => this.productModal.open(p)
    }).mount(appContainer);

    // New Arrivals
    new ProductSection({
      title: "New Arrivals",
      products: this.products.slice(13, 18),
      visibleCount: 4,
      cartContext: this.cartContext,
      onSelectProduct: (p) => this.productModal.open(p)
    }).mount(appContainer);

    new CartList({ cartContext: this.cartContext }).mount(appContainer);

    new Footer().mount(appContainer);
    return appContainer;
  }
}
