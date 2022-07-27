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
