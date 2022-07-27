import {
  getIncomeAndCostSumOfDate,
  getState,
  subscribeState,
} from '../../../controller';
import { storeKeys, WEEK_LENGTH } from '../../../utils/constant';
import { getStartAndEndDate } from '../../../utils/date';

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
          if (income) data.income = income;
          if (cost) data.cost = cost;
          if (income || cost) data.total = (income ?? 0) - (cost ?? 0);
        }
      }
    }

    return dataTable;
  }

  generateRow() {}

  render() {
    const dataTable = this.makeDataTable();

    this.$body.innerHTML = `
        ${dataTable
          .map(
            (row) =>
              `<tr>
              ${row
                .map(
                  (column) =>
                    `<td>
                    <div class='calendar-amount'>
                      ${
                        column.income
                          ? `<div class='calendar-amount-income'>${column.income}</div>`
                          : ''
                      }
                      ${
                        column.cost
                          ? `<div class='calendar-amount-cost'>-${column.cost}</div>`
                          : ''
                      }
                      ${
                        column.total
                          ? `<div class='calendar-amount-total'>${column.total}</div>`
                          : ''
                      }
                    </div>
                    ${
                      column.date
                        ? `<div class='calendar-date'>${column.date}</div>`
                        : ''
                    }
                  </td>`,
                )
                .join('')}
            </tr>`,
          )
          .join('')}
      `;
  }
}
