import './Calendar.scss';
import { CalendarBody } from './Body/CalendarBody';
import { CalendarHeader } from './Header/CalenderHeader';

export class Calendar {
  constructor($target) {
    this.$target = $target;
    this.$calendar = document.createElement('main');
    this.$calendar.className = 'calendar';

    this.$target.appendChild(this.$calendar);
    this.init();
    this.render();
  }

  init() {}

  render() {
    new CalendarHeader(this.$calendar);
    new CalendarBody(this.$calendar);
  }
}
