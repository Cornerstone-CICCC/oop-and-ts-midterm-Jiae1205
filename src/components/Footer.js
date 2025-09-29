// components/Footer.js
import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const el = document.createElement("footer");
    el.className = "site-footer";
    el.innerText = "© 2025 Fake Shop. All rights reserved.";
    return el;
  }
}
