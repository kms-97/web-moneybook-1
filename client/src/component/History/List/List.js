import {
  changeSelectedHistory,
  getState,
  getIncomeSum,
  getCostSum,
  getFilteredHistories,
} from '../../../controller';
import { subscribeState } from '../../../controller';
import { categoryClassName, storeKeys } from '../../../utils/constant';
import { getDay } from '../../../utils/date';
import { getFormattedAmount } from '../../../utils/amount';

export class List {
  constructor($target) {
    this.$target = $target;
    this.$list = document.createElement('ul');
    this.$list.className = 'list';

    this.unsubscribeHistory = subscribeState({
      key: storeKeys.CURRENT_HISTORY,
      callback: () => {
        this.render();
      },
    });
    this.unsubscribeHistory = subscribeState({
      key: storeKeys.ISCHECKED_FILTER,
      callback: () => {
        this.render();
      },
    });

    this.unsubscribePayment = subscribeState({
      key: storeKeys.PAYMENT,
      callback: () => {
        this.render();
      },
    });

    this.$target.appendChild(this.$list);
    this.init();
    this.render();
  }

  init() {
    this.$list.addEventListener('click', this.selectHistoryItem);
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

  render() {
    const { year, month } = getState({ key: storeKeys.CURRENT_DATE });
    const category = getState({ key: storeKeys.CATEGORY });
    const payment = getState({ key: storeKeys.PAYMENT });
    const history = getFilteredHistories();

    this.$list.innerHTML = `
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
              (value) => `<tr data-id=${value.id}>
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
              </tr>`,
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
