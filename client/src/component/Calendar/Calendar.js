import './Calendar.scss';
import { CalendarBody } from './Body/CalendarBody';
import { CalendarHeader } from './Header/CalenderHeader';
import { getState, subscribeState } from '../../store';
import { storeKeys } from '../../utils/constant';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';

export class Calendar {
  constructor($target) {
    this.$target = $target;
    this.$calendar = document.createElement('main');
    this.$calendar.className = 'calendar';

    this.unsubscribeIsLoading = subscribeState({
      key: storeKeys.ISLOADING,
      callback: () => this.render(),
    });

    this.$target.appendChild(this.$calendar);
    this.init();
    this.render();
  }

  init() {}

  render() {
    const isLoading = getState({ key: storeKeys.ISLOADING });

    this.$calendar.innerHTML = '';
    if (isLoading) {
      new LoadingIndicator(this.$calendar);
      return;
    }
    new CalendarHeader(this.$calendar);
    new CalendarBody(this.$calendar);
  }
}
