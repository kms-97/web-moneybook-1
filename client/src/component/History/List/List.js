import {
  changeSelectedHistory,
  getState,
  getIncomeSum,
  getCostSum,
  getFilteredHistories,
} from '../../../controller';
import { categoryClassName, storeKeys } from '../../../utils/constant';
import { getDay } from '../../../utils/date';
import { getFormattedAmount } from '../../../utils/amount';
import Component from '../../../core/Component';

export class List extends Component {
  constructor($parent) {
    super($parent, 'ul', { class: 'list' });

    this.subscribeState([
      storeKeys.CURRENT_HISTORY,
      storeKeys.ISCHECKED_FILTER,
      storeKeys.PAYMENT,
    ]);
  }

  attachEvents() {
    this.$self.addEventListener('click', (e) => {
      this.selectHistoryItem(e);
    });
  }

  selectHistoryItem(e) {
    const $tr = e.target.closest('tr');
    if (!$tr) return;

    if ($tr.classList.contains('active')) {
      changeSelectedHistory({});
      $tr.classList.remove('active');
    } else {
      const trId = Number($tr.dataset.id);
      changeSelectedHistory({ id: trId });
      document
        .querySelectorAll('tr')
        .forEach((e) => e.classList.remove('active'));
      $tr.classList.add('active');
    }
  }

  isSelectedRow(id, target) {
    if (!target) return false;
    return target.id === id;
  }

  makeSubtitle(date, data) {
    return `
      <div class='subtitle'>
        ${this.makeSubtitleDate(date)}
        ${this.makeSubtitleSum(data)}
      </div>
    `;
  }

  makeSubtitleDate(date) {
    const { year, month } = getState({ key: storeKeys.CURRENT_DATE });

    return `
    <div class='date'>
      ${date}일
      <span class='week'>
        ${getDay(year, month, date)}
      </span>
    </div>
    `;
  }

  makeSubtitleSum(data) {
    const incomeSum = getIncomeSum(data);
    const costSum = getCostSum(data);

    return `
    <div class='sum'>
      ${
        incomeSum
          ? `<div class='income'>수입 ${getFormattedAmount(incomeSum)}</div>`
          : ''
      }
      ${
        costSum
          ? `<div class='cost'>지출 ${getFormattedAmount(costSum)}</div>`
          : ''
      }
    </div>
    `;
  }

  makeTable(data) {
    return `
      <table class='item'>
        ${data.map((dailyData) => this.makeTableRow(dailyData)).join('')}
      </table>
    `;
  }

  makeTableRow({ id, categoryId, content, paymentId, isIncome, amount }) {
    const selectedHistory = getState({ key: storeKeys.SELECTED_HISTORY });
    const isSelcted = this.isSelectedRow(id, selectedHistory);

    return `
      <tr data-id=${id} class=${isSelcted ? 'active' : ''}>
        ${this.makeCategoryCell(categoryId)}
        ${this.makeContentCell(content)}
        ${this.makePaymentCell(paymentId)}
        ${this.makeAmountCell(isIncome, amount)}
      </tr>`;
  }

  makeCategoryCell(categoryId) {
    const category = getState({ key: storeKeys.CATEGORY });

    return `
    <td class='category'>
      <span class=${categoryClassName[categoryId]}>
        ${category.filter((c) => c.id === categoryId)[0]?.content ?? ''}
      </span>
    </td>`;
  }

  makeContentCell(content) {
    return `<td class='content'>${content}</td>`;
  }

  makePaymentCell(paymentId) {
    const payment = getState({ key: storeKeys.PAYMENT });

    return `
    <td class='payment'>
      ${payment.filter(({ id }) => id === paymentId)[0]?.content ?? ''}
    </td>`;
  }

  makeAmountCell(isIncome, amount) {
    return `
    <td class='amount ${isIncome ? 'income' : 'cost'}'>
      ${getFormattedAmount(amount)}
    </td>
    `;
  }

  render() {
    const history = getFilteredHistories();

    this.$self.innerHTML = `
    ${history
      .map(({ date, data }) => {
        return `
        <li>
          ${this.makeSubtitle(date, data)}
          ${this.makeTable(data)}
        </li>
      `;
      })
      .join('')}
    `;
  }
}
