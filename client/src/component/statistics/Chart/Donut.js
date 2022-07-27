import { hexToRGB } from '../../../utils/color';

export class DonutChart {
  constructor($target, data = [], width = 300, height = 300, chartWidth = 50) {
    this.$target = $target;
    this.$chart = document.createElement('canvas');

    this.data = data;
    this.chartWidth = chartWidth;
    this.$chart.width = width;
    this.$chart.height = height;
    this.ctx = this.$chart.getContext('2d');

    this.$target.appendChild(this.$chart);
    this.init();
    this.render();
  }

  init() {}

  getCenter() {
    return { x: this.$chart.width / 2, y: this.$chart.height / 2 };
  }

  getRadius() {
    return Math.min(this.$chart.width, this.$chart.height) / 2 - 10;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.$chart.width, this.$chart.height);
  }

  getTotalValue() {
    return this.data.reduce((sum, { value }) => sum + value, 0);
  }

  drawDonut() {
    const center = this.getCenter();
    const radius = this.getRadius();
    const initAngle = -Math.PI * (1 / 2);
    const totalValue = this.getTotalValue();

    this.data.reduce((sum, { content, value, color }) => {
      const startAngle = initAngle + (sum / totalValue) * (Math.PI * 2);
      const endAngle = initAngle + ((sum + value) / totalValue) * (Math.PI * 2);

      this.drawOuterCircle(center, radius, startAngle, endAngle, color);
      this.removeInnerCircle(center, radius, startAngle, endAngle);

      return sum + value;
    }, 0);
  }

  drawOuterCircle(center, radius, startAngle, endAngle, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(center.x, center.y);
    this.ctx.arc(center.x, center.y, radius, startAngle, endAngle);
    this.ctx.fillStyle = hexToRGB(color);
    this.ctx.fill();
    this.ctx.closePath();
  }

  removeInnerCircle(center, radius) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(center.x, center.y);
    this.ctx.arc(center.x, center.y, radius - this.chartWidth, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.clip();
    this.clearCanvas();
    this.ctx.restore();
  }

  render() {
    this.clearCanvas();
    this.drawDonut();
  }
}
