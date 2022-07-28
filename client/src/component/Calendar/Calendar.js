import './Calendar.scss';
import { CalendarBody } from './Body/CalendarBody';
import { CalendarHeader } from './Header/CalenderHeader';
import { getState } from '../../controller';
import { storeKeys } from '../../utils/constant';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import Component from '../../core/Component';

export class Calendar extends Component {
  constructor($parent) {
    super($parent, 'main', { class: 'calendar' });

    this.subscribeState([storeKeys.ISLOADING]);
  }

  render() {
    const isLoading = getState({ key: storeKeys.ISLOADING });

    if (isLoading) {
      this.clearComponent();
      new LoadingIndicator(this.$self);
      return;
    }

    new CalendarHeader(this.$self);
    new CalendarBody(this.$self);
  }
}
