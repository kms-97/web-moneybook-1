import { Calendar } from '../component/Calendar/Calendar';
import { Header } from '../component/Header/Header';

export class CalendarView {
  constructor($target) {
    this.$target = $target;

    new Header(this.$target);
    new Calendar(this.$target);
  }

  init() {}

  render() {}
}
