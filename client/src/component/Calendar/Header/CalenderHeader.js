import Component from '../../../core/Component';

export class CalendarHeader extends Component {
  constructor($parent) {
    super($parent, 'div', { class: 'calendar-header' });
  }

  render() {
    this.$self.innerHTML = `
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
