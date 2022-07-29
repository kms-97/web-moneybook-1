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

  render() {
    const { year, month } = getState({ key: storeKeys.CURRENT_DATE });
    const category = getState({ key: storeKeys.CATEGORY });
    const payment = getState({ key: storeKeys.PAYMENT });
    const selectedHistory = getState({ key: storeKeys.SELECTED_HISTORY });
    const history = getFilteredHistories();

    this.$self.innerHTML = `
    ${history
      .map(({ date, data }) => {
        const incomeSum = getIncomeSum(data);
        const costSum = getCostSum(data);
        return `
        <li>
          <div class='subtitle'>
            <div class='date'>${date}일 <span class='week'>${getDay(
          year,
          month,
          date,
        )}</span></div>
            <div class='sum'>
                ${
                  incomeSum
                    ? `<div class='income'>수입 ${getFormattedAmount(
                        incomeSum,
                      )}</div>`
                    : ''
                }
                ${
                  costSum
                    ? `<div class='cost'>지출 ${getFormattedAmount(
                        costSum,
                      )}</div>`
                    : ''
                }
            </div>
          </div>
          <table class='item'>
          ${data
            .map(
              (value) => `
                <tr data-id=${value.id} class=${
                this.isSelectedRow(value.id, selectedHistory) ? 'active' : ''
              }>
                <td class='category'><span class=${
                  categoryClassName[value.categoryId]
                }>${
                category.filter((c) => c.id === value.categoryId)[0]?.content ??
                ''
              }</span></td>
                <td class='content'>${value.content}</td>
                <td class='payment'>${
                  payment.filter(({ id }) => id === value.paymentId)[0]
                    ?.content ?? ''
                }</td>
                <td class='amount ${
                  value.isIncome ? 'income' : 'cost'
                }'>${getFormattedAmount(value.amount)}</td>
                </tr>
              `,
            )
            .join('')}
          </table>
        </li>
      `;
      })
      .join('')}
      `;
  }
}
