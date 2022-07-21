import './History.scss';
import store from '../../store/store.js';

export class History {
  constructor($target) {
    this.$target = $target;
    this.$history = document.createElement('main');
    this.$history.className = 'history-view';

    [this.getHistoryInfo, this.setHistoryInfo] =
      store.historyInfo.subscribe(this);

    this.$target.appendChild(this.$history);
    this.render();
  }

  init() {}

  sendNotify() {
    this.render();
  }

  render() {
    const history = this.getHistoryInfo().history.sort((a, b) => {
      if (a.date > b.date) return -1;
      else if (a.date < b.date) return 1;
      return 0;
    });

    const map = new Map();
    history.forEach((h) => {
      map.get(h.date) ?? map.set(h.date, []);
      map.get(h.date).push(h);
    });
    this.$history.innerHTML = `
      <div class="title">
        <div class=count>전체 내역 13건</div>
        <ul class=filter>
          <li>
            <input id='filter-income' type='checkbox' checked>
            <label for='filter-income'>수입 1,822,480</label>
          </li>
          <li>
            <input id='filter-cost' type='checkbox' checked>
            <label for='filter-cost'>지출 798,180</label>
          </li>
        </ul>
      </div>
      <ul class="list">
        ${Array.from(map.values())
          .map(
            (val) => `
        <li>
          <div class='subtitle'>
            <div class='date'>${val[0].date} <span class='week'>수</span></div>
            <div class='sum'>
                <div class='income'>수입 ${val.reduce(
                  (p, { amount, isIncome }) =>
                    isIncome ? p + parseInt(amount) : p,
                  0,
                )}</div>
                <div class='cost'>지출 ${val.reduce(
                  (p, { amount, isIncome }) =>
                    !isIncome ? p + parseInt(amount) : p,
                  0,
                )}</div>
            </div>
          </div>
          <table class='item'>
          ${val
            .map(
              (value) => `<tr>
              <td class='category'><span class='food'>${
                value.categoryId
              }</span></td>
              <td class='content'>${value.content}</td>
              <td class='payment'>${value.paymentId}</td>
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
