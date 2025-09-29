// components/SearchBar.js
import { Component } from "../common/Component.js";

export class SearchBar extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "search-bar";

    const inputWrapper = document.createElement("div");
    inputWrapper.className = "input-wrapper";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search products...";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-magnifying-glass search-icon";

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(icon);
    container.appendChild(inputWrapper);

    return container;
  }
}
