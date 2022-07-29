import Chart from '../../../core/Chart';
import { hexToRGB } from '../../../utils/color';

export class DonutChart extends Chart {
  constructor($parent, options) {
    super($parent, options);
  }

  setOptions(options) {
    this.data = options.data ?? [];
    this.chartWidth = options.chartWidth ?? 50;
    this.$canvas.width = options.width ?? 300;
    this.$canvas.height = options.height ?? 300;
  }

  getCenter() {
    return { x: this.$canvas.width / 2, y: this.$canvas.height / 2 };
  }

  getRadius() {
    return Math.min(this.$canvas.width, this.$canvas.height) / 2 - 10;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
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
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, radius, startAngle, endAngle);
    ctx.fillStyle = hexToRGB(color);
    ctx.fill();
    ctx.closePath();
  }

  removeInnerCircle(center, radius) {
    const ctx = this.ctx;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, radius - this.chartWidth, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    this.clearCanvas();
    ctx.restore();
  }

  render() {
    this.clearCanvas();
    this.drawDonut();
  }
}
