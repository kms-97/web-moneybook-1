export class CalendarHeader {
  constructor($target) {
    this.$target = $target;
    this.$header = document.createElement('div');
    this.$header.className = 'calendar-header';

    this.$target.appendChild(this.$header);
    this.init();
    this.render();
  }

  init() {}

  render() {
    this.$header.innerHTML = `
        <div class='calendar-header-day sunday'>일</div>
        <div class='calendar-header-day'>월</div>
        <div class='calendar-header-day'>화</div>
        <div class='calendar-header-day'>수</div>
        <div class='calendar-header-day'>목</div>
        <div class='calendar-header-day'>금</div>
        <div class='calendar-header-day saturday'>토</div>
      `;
  }
}
