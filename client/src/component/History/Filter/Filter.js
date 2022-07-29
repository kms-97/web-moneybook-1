import {
  getCostSumCurrentMonth,
  getIncomeSumCurrentMonth,
  setState,
} from '../../../controller';
import Component from '../../../core/Component';
import { getFormattedAmount } from '../../../utils/amount';
import { storeKeys } from '../../../utils/constant';

export class Filter extends Component {
  constructor($parent) {
    super($parent, 'ul', { class: 'filter' });

    this.subscribeState([storeKeys.CURRENT_HISTORY]);
  }

  attachEvents() {
    this.$self.addEventListener('click', () => {
      this.onClickFilter();
    });
  }

  onClickFilter() {
    const $filterIncome = this.$self.querySelector('#filter-income');
    const $filterCost = this.$self.querySelector('#filter-cost');

    const newState = {
      income: $filterIncome.checked,
      cost: $filterCost.checked,
    };
    setState({ key: storeKeys.ISCHECKED_FILTER, newState });
  }

  render() {
    this.$self.innerHTML = `
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
