// components/CategoryList.js
import { Component } from "../common/Component.js";

export class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.categories = props?.categories || [];
    this.onSelectCategory = props?.onSelectCategory;
  }

  render() {
    const el = document.createElement("ul");
    el.className = "category-list";

    // 'All' 옵션 추가
    const allLi = document.createElement("li");
    allLi.textContent = "All";
    allLi.className = "category-item";
    allLi.addEventListener("click", () => {
      if (this.onSelectCategory) this.onSelectCategory(null);
    });
    el.appendChild(allLi);

    this.categories.forEach(cat => {
      const li = document.createElement("li");
      li.className = "category-item";
      li.textContent = cat;
      li.addEventListener("click", () => {
        if (this.onSelectCategory) {
          this.onSelectCategory(cat);
        }
      });
      el.appendChild(li);
    });

    return el;
  }
}
