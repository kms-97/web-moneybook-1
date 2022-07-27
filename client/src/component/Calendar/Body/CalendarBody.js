import { subscribeState } from '../../../controller';
import { storeKeys } from '../../../utils/constant';

export class CalendarBody {
  constructor($target) {
    this.$target = $target;
    this.$body = document.createElement('table');
    this.$body.className = 'calendar-body';

    this.unsubscribeHistory = subscribeState({
      key: storeKeys.CURRENT_HISTORY,
      callback: () => this.render(),
    });

    this.$target.appendChild(this.$body);
    this.init();
    this.render();
  }

  init() {}

  makeDataTable() {
    const { year, month } = getState({ key: storeKeys.CURRENT_DATE });
    const { startDate, endDate } = getStartAndEndDate({ year, month });
    const startDay = new Date(year, month - 1, startDate).getDay();
    const trLength = Math.ceil((endDate + startDay) / WEEK_LENGTH);
    const dataTable = new Array(trLength).fill(0).map(() =>
      new Array(WEEK_LENGTH).fill(0).map(() => {
        return {};
      }),
    );

    for (let i = 0; i < trLength; i++) {
      for (let j = 0; j < WEEK_LENGTH; j++) {
        const date = i * WEEK_LENGTH + j - (startDay - 1);

        if (date >= startDate && date <= endDate) {
          const data = dataTable[i][j];
          const { income, cost } = getIncomeAndCostSumOfDate(date);

          data.date = date;
          if (income || cost) {
            if (income) data.income = income;
            if (cost) data.cost = cost;
            data.total = (income ?? 0) - (cost ?? 0);
          }
        }
      }
    }

    return dataTable;
  }

  generateRow() {}

  render() {
    this.$body.innerHTML = `
        <tr>
            <td class='today'>
            <div class='calendar-amount'>
                <div class='calendar-amount-income'>130,000</div>
                <div class='calendar-amount-cost'>20,000</div>
                <div class='calendar-amount-total'>110,000</div>
            </div>
            <div class='calendar-date'>1</div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
      `;
  }
}
