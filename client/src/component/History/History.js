import './History.scss';
import { parseDateString, getDay } from '../../utils/date';
import {
  subscribeState,
  getState,
  changeSelectedHistory,
} from '../../controller';
import { storeKeys } from '../../utils/constant';

export class History {
  constructor($target) {
    this.$target = $target;
    this.$history = document.createElement('main');
    this.$history.className = 'history-view';

    this.unsubscribeHistory = subscribeState({
      key: storeKeys.CURRENT_HISTORY,
      callback: () => {
        this.render();
      },
    });

    this.$target.appendChild(this.$history);
    this.render();
    this.init();
  }

  init() {
    this.$history.addEventListener('click', (e) => {
      const $tr = e.target.closest('tr');
      if (!$tr) return;

      // .active 클래스 붙이기

      // set selected history
      const trId = Number($tr.dataset.id);
      changeSelectedHistory({ id: trId });
    });
  }

  render() {
    const { year, month } = getState({ key: storeKeys.CURRENT_DATE });
    const history = getState({ key: storeKeys.CURRENT_HISTORY });
    const category = getState({ key: storeKeys.CATEGORY });
    const payment = getState({ key: storeKeys.PAYMENT });

    this.$history.innerHTML = `
      <div class="title">
        <div class=count>전체 내역 ${history.reduce(
          (p, { datas }) => p + datas.length,
          0,
        )}건</div>
        <ul class=filter>
          <li>
            <input id='filter-income' type='checkbox' checked>
            <label for='filter-income'>수입 ${history.reduce(
              (p, { datas }) =>
                p +
                datas.reduce(
                  (p, { isIncome, amount }) =>
                    isIncome ? p + parseInt(amount) : p,
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
                  (p, { isIncome, amount }) =>
                    !isIncome ? p + parseInt(amount) : p,
                  0,
                ),
              0,
            )}</label>
          </li>
        </ul>
      </div>
      <ul class="list">
        ${history
          .map(
            ({ date, datas }) => `
        <li>
          <div class='subtitle'>
            <div class='date'>${date}일 <span class='week'>${getDay(
              year,
              month,
              date,
            )}</span></div>
            <div class='sum'>
                <div class='income'>수입 ${datas.reduce(
                  (p, { amount, isIncome }) =>
                    isIncome ? p + parseInt(amount) : p,
                  0,
                )}</div>
                <div class='cost'>지출 ${datas.reduce(
                  (p, { amount, isIncome }) =>
                    !isIncome ? p + parseInt(amount) : p,
                  0,
                )}</div>
            </div>
          </div>
          <table class='item'>
          ${datas
            .map(
              (value) => `<tr data-id=${value.id}>
              <td class='category'><span class='food'>${
                category.filter((c) => c.id === value.categoryId)[0]?.content ??
                ''
              }</span></td>
              <td class='content'>${value.content}</td>
              <td class='payment'>${
                payment.filter(({ id }) => id === value.paymentId)[0]
                  ?.content ?? ''
              }</td>
              <td class='amount ${value.isIncome ? 'income' : 'cost'}'>${
                value.amount
              }</td>
              </tr>`,
            )
            .join('')}
          </table>
        </li>
        `,
          )
          .join('')}
      </ul>
    `;
  }
}
