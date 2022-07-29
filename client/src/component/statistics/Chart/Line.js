import Chart from '../../../core/Chart';

export class LineChart extends Chart {
  constructor($parent, options) {
    super($parent, options);
  }

  setOptions(options) {
    this.data = options.data ?? [];
    this.$canvas.width = options.width ?? 700;
    this.$canvas.height = options.height ?? 300;
    this.lineColor = options.lineColor ?? '#2ac1bc';
    this.lineWidth = options.lineWidth ?? 3;
    this.gridWidth = options.gridWidth ?? 1;
    this.gridColor = options.gridColor ?? '#ccd3d3';
    this.pointRadius = options.pointRadius ?? 3;
    this.ySteps = options.ySteps ?? 10;
    this.font = options.font ?? 'Do Hyeon';
    this.fontSize = options.fontSize ?? 16;
    this.xlabelYposition = options.xlabelYposition ?? 5;
    this.valueLabelYposition = options.valueLabelYposition ?? -5;
    this.xlabelHeight =
      options.xlabelHeight ?? this.fontSize + this.xlabelYposition;
  }

  getOriginPosition() {
    return { x: 0, y: this.$canvas.width };
  }

  getCoordinate(xdiff, ydiff) {
    const origin = this.getOriginPosition();
    return { x: origin.x + xdiff, y: origin.y - ydiff };
  }

  getChartHeight() {
    return this.$canvas.height - this.xlabelHeight;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
  }

  getTotalValue() {
    return this.data.reduce((sum, { value }) => sum + value, 0);
  }

  getMinValue() {
    return this.data.reduce(
      (min, { value }) => Math.min(min, value),
      Number.MAX_SAFE_INTEGER,
    );
  }

  getMaxValue() {
    return this.data.reduce(
      (max, { value }) => Math.max(max, value),
      Number.MIN_SAFE_INTEGER,
    );
  }

  getYStepValue() {
    const maxValue = this.getMaxValue();
    const minValue = this.getMinValue();

    return (maxValue - minValue) / this.ySteps;
  }

  getYRange() {
    const maxValue = this.getMaxValue();
    const maxY = Math.max(maxValue * 1.1, 1);
    return [maxY, 0];
  }

  getDataLength() {
    return this.data.length;
  }

  getPointX(index) {
    const order = index + 1;
    const canvasWidth = this.$canvas.width;
    const dataLength = this.getDataLength();
    return (canvasWidth / (dataLength + 1)) * order;
  }

  getPointY(value) {
    const [maxY, minY] = this.getYRange();
    return this.getChartHeight() * ((maxY - value) / (maxY - minY));
  }

  setCtxToDefault() {
    this.ctx.fillStyle = '#000000';
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 1;
  }

  drawPoint(x, y, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    if (color) {
      this.ctx.strokeStyle = color;
      this.ctx.fillStyle = color;
    }
    this.ctx.arc(x, y, this.pointRadius, 0, Math.PI * 2);
    this.ctx.fill();
    this.setCtxToDefault();
  }

  drawLine(startX, startY, endX, endY, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.closePath();

    if (color) this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.setCtxToDefault();
  }

  drawBorder(color) {
    const chartHeight = this.getChartHeight();

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, chartHeight);
    this.ctx.lineTo(this.$canvas.width, chartHeight);
    this.ctx.lineTo(this.$canvas.width, 0);
    this.ctx.lineTo(0, 0);
    this.ctx.closePath();
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.setCtxToDefault();
  }

  drawGrid() {
    const dataLength = this.getDataLength();
    const chartHeight = this.getChartHeight();

    this.ctx.lineWidth = this.gridWidth;
    for (let i = 1; i < this.ySteps; i++) {
      const y = (chartHeight / this.ySteps) * i;
      this.drawLine(0, y, this.$canvas.width, y, this.gridColor);
    }

    for (let i = 0; i < dataLength; i++) {
      const x = this.getPointX(i);
      this.drawLine(x, 0, x, chartHeight, this.gridColor);
    }
  }

  addLabel() {
    this.ctx.lineWidth = 1;
    this.ctx.font = `${this.fontSize}px ${this.font}`;

    this.data.forEach(({ label, value }, index) => {
      const x = this.getPointX(index);
      const y = this.getPointY(value);

      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'bottom';
      this.ctx.fillText(
        value.toLocaleString(),
        x,
        y + this.valueLabelYposition,
      );

      this.ctx.textBaseline = 'top';
      this.ctx.fillText(
        label,
        x,
        this.$canvas.height - this.xlabelHeight + this.xlabelYposition,
      );
    });
  }

  drawChart() {
    let prevX;
    let prevY;

    this.ctx.lineWidth = this.lineWidth;
    this.data.forEach(({ value }, index) => {
      const x = this.getPointX(index);
      const y = this.getPointY(value);

      if (prevX !== undefined && prevY !== undefined)
        this.drawLine(prevX, prevY, x, y, this.lineColor);
      this.drawPoint(
        this.getPointX(index),
        this.getPointY(value),
        this.lineColor,
      );

      prevX = x;
      prevY = y;
    });

    this.setCtxToDefault();
  }

  render() {
    this.drawGrid();
    this.drawBorder(this.gridColor);
    this.drawChart();
    this.addLabel();
  }
}
