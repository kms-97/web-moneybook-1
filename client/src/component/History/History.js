import './History.scss';
import {
  historyStore,
  selectedHistoryStore,
  categoryStore,
  paymentStore,
} from '../../store/store.js';
import { parseDateString, getDay } from '../../utils/date';

export class History {
  constructor($target) {
    this.$target = $target;
    this.$history = document.createElement('main');
    this.$history.className = 'history-view';

    this.unsubscribeHistoryStore = historyStore.subscribe(() => this.render());

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
      const history = historyStore.get();
      for (let { datas } of history) {
        for (let data of datas) {
          if (data.id === trId) {
            return selectedHistoryStore.set(data);
          }
        }
      }
    });
  }

  render() {
    const history = historyStore.get();
    const category = categoryStore.get();
    const payment = paymentStore.get();

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
            <div class='date'>${date} <span class='week'>${getDay(
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
