import { getState, subscribeState } from '../../../controller';
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

    this.$target.appendChild(this.$count);
    this.render();
  }

  render() {
    const history = getState({ key: storeKeys.CURRENT_HISTORY });
    this.$count = `전체 내역 ${history.reduce(
      (p, { datas }) => p + datas.length,
      0,
    )}건`;
  }
}
