import { getPaymentLength, subscribeState } from '../../../controller';
import { storeKeys } from '../../../utils/constant';

export class Count {
  constructor($target) {
    this.$target = $target;
    this.$count = document.createElement('div');
    this.$count.className = 'count';

    this.unsubscribeHistory = subscribeState({
      key: storeKeys.CURRENT_HISTORY,
      callback: () => {
        this.render();
      },
    });

    this.unsubscribeIsCheckedFilter = subscribeState({
      key: storeKeys.ISCHECKED_FILTER,
      callback: () => {
        this.render();
      },
    });

    this.$target.appendChild(this.$count);
    this.render();
  }

  render() {
    this.$count.innerHTML = `전체 내역 ${getPaymentLength()}건`;
  }
}
