export default class Chart {
  constructor($parent, options) {
    this.$parent = $parent;
    this.$canvas = document.createElement('canvas');
    this.ctx = this.$canvas.getContext('2d');

    this.$parent.appendChild(this.$canvas);
    this.setOptions(options);
    this.render();
  }

  setOption() {}

  render() {}
}
