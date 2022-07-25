import { getState, subscribeState } from '../../../controller';
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
    const history = getState({ key: storeKeys.CURRENT_HISTORY });
    this.$filter = `
    <li>
      <input id='filter-income' type='checkbox' checked>
      <label for='filter-income'>수입 ${history.reduce(
        (p, { datas }) =>
          p +
          datas.reduce(
            (p, { isIncome, amount }) => (isIncome ? p + parseInt(amount) : p),
            0,
          ),
        0,
      )}</label>
    </li>
    <li>
      <input id='filter-cost' type='checkbox' checked>
      <label for='filter-cost'>지출 ${history.reduce(
        (p, { datas }) =>
          p +
          datas.reduce(
            (p, { isIncome, amount }) => (!isIncome ? p + parseInt(amount) : p),
            0,
          ),
        0,
      )}</label>
    </li>`;
  }
}
