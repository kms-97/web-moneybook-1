import {
  getCostSumCurrentMonth,
  getIncomeSumCurrentMonth,
  getState,
  subscribeState,
} from '../../../controller';
import { storeKeys } from '../../../utils/constant';

export class Filter {
  constructor($target) {
    this.$target = $target;
    this.$filter = document.createElement('ul');
    this.$filter.className = 'filter';

    this.unsubscribeHistory = subscribeState({
      key: storeKeys.CURRENT_HISTORY,
      callback: () => {
        this.render();
      },
    });

    this.$target.appendChild(this.$filter);
    this.render();
  }

  render() {
    this.$filter.innerHTML = `
    <li>
      <input id='filter-income' type='checkbox' checked>
      <label for='filter-income'>수입 ${getIncomeSumCurrentMonth()}</label>
    </li>
    <li>
      <input id='filter-cost' type='checkbox' checked>
      <label for='filter-cost'>지출 ${getCostSumCurrentMonth()}</label>
    </li>`;
  }
}
