import { subscribeState } from '../controller';

export default class Component {
  constructor($parent, elementType, attributes = {}, props = {}) {
    this.$parent = $parent;
    this.$self = document.createElement(elementType);
    this.attributes = attributes;
    this.unsubscribers = [];
    this.props = props;

    this.$parent.appendChild(this.$self);
    this.init();
  }

  init() {
    this.setAttribute();
    this.attachEvents();
    this.render(this.props);
  }

  setAttribute() {
    Object.entries(this.attributes).forEach(([name, value]) =>
      this.$self.setAttribute(name, value),
    );
  }

  subscribeState(keys) {
    keys.forEach((key) => {
      this.unsubscribers.push(
        subscribeState({ key, callback: () => this.render(this.props) }),
      );
    });
  }

  attachEvents() {}

  cleanUp() {
    this.unsubscribers.forEach((fn) => fn());
  }

  clearComponent() {
    this.$self.innerHTML = '';
  }

  render() {}
}
