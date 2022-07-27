import {
  getCostSumCurrentMonth,
  getIncomeSumCurrentMonth,
  getState,
  setState,
  subscribeState,
} from '../../../controller';
import { getFormattedAmount } from '../../../utils/amount';
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
    this.init();
  }

  init() {
    this.$filter.addEventListener('click', (event) => {
      this.onClickFilter();
    });
  }

  onClickFilter() {
    const $filterIncome = this.$filter.querySelector('#filter-income');
    const $filterCost = this.$filter.querySelector('#filter-cost');

    const newState = {
      income: $filterIncome.checked,
      cost: $filterCost.checked,
    };
    setState({ key: storeKeys.ISCHECKED_FILTER, newState });
  }

  render() {
    this.$filter.innerHTML = `
    <li>
      <input id='filter-income' type='checkbox' checked>
      <label for='filter-income'>수입 ${getFormattedAmount(
        getIncomeSumCurrentMonth(),
      )}</label>
    </li>
    <li>
      <input id='filter-cost' type='checkbox' checked>
      <label for='filter-cost'>지출 ${getFormattedAmount(
        getCostSumCurrentMonth(),
      )}</label>
    </li>`;
  }
}
