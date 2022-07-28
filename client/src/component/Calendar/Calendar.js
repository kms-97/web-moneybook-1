import './Calendar.scss';
import { CalendarBody } from './Body/CalendarBody';
import { CalendarHeader } from './Header/CalenderHeader';
import Component from '../../core/Component';

export class Calendar extends Component {
  constructor($parent) {
    super($parent, 'main', { class: 'calendar' });
  }

  render() {
    new CalendarHeader(this.$self);
    new CalendarBody(this.$self);
  }
}
