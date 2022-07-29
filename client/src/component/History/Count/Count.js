import { getPaymentLength } from '../../../controller';
import Component from '../../../core/Component';
import { storeKeys } from '../../../utils/constant';

export class Count extends Component {
  constructor($parent) {
    super($parent, 'div', { class: 'count' });

    this.subscribeState([
      storeKeys.CURRENT_HISTORY,
      storeKeys.ISCHECKED_FILTER,
    ]);
  }

  render() {
    this.$self.innerHTML = `전체 내역 ${getPaymentLength()}건`;
  }
}
