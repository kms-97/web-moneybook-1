import { getState } from '../../../controller';
import { subscribeState } from '../../../controller';
import { storeKeys } from '../../../utils/constant';
import { getDay } from '../../../utils/date';

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

    this.$target.appendChild(this.$list);
    this.render();
  }

  render() {
    const { year, month } = getState({ key: storeKeys.CURRENT_DATE });
    const history = getState({ key: storeKeys.CURRENT_HISTORY });
    const category = getState({ key: storeKeys.CATEGORY });
    const payment = getState({ key: storeKeys.PAYMENT });

    this.$list.innertHTML = `
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
          <td class='category'><span style='background-color: ${
            category.filter((c) => c.id === value.categoryId)[0]?.color
          }'>${
            category.filter((c) => c.id === value.categoryId)[0]?.content ?? ''
          }</span></td>
          <td class='content'>${value.content}</td>
          <td class='payment'>${
            payment.filter(({ id }) => id === value.paymentId)[0]?.content ?? ''
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
      `;
  }
}
