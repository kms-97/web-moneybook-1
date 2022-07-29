import './Calendar.scss';
import { CalendarBody } from './Body/CalendarBody';
import { CalendarHeader } from './Header/CalenderHeader';
import { getState } from '../../controller';
import { storeKeys } from '../../utils/constant';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import Component from '../../core/Component';
import CalendarFooter from './Footer/CalendarFooter';

export class Calendar extends Component {
  constructor($parent) {
    super($parent, 'main', { class: 'calendar' });

    this.subscribeState([storeKeys.ISLOADING, storeKeys.CURRENT_HISTORY]);
  }

  render() {
    const isLoading = getState({ key: storeKeys.ISLOADING });

    this.clearComponent();
    if (isLoading) {
      new LoadingIndicator(this.$self);
      return;
    }

    new CalendarHeader(this.$self);
    new CalendarBody(this.$self);
    new CalendarFooter(this.$self);
  }
}
