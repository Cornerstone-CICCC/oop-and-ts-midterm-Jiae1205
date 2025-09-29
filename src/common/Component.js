export class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.element = null;
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.update();
  }

  update() {
    const newElement = this.render();
    if (this.element && this.element.parentNode) {
      this.element.parentNode.replaceChild(newElement, this.element);
    }
    this.element = newElement;
    this.componentDidUpdate();
  }

  render() {
    throw new Error("Component should have a render() method!");
  }

  mount(container) {
    this.element = this.render();
    container.appendChild(this.element);
    this.componentDidMount();
  }

  componentDidMount() {}
  componentDidUpdate() {}
}
