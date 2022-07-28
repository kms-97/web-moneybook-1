import { getState } from '../../../store';
import { storeKeys } from '../../../utils/constant';
import { makeDateString, getTodayString } from '../../../utils/date';

export class DateInput {
  constructor($target) {
    this.$target = $target;
    this.$dateInput = document.createElement('div');
    this.$target.appendChild(this.$dateInput);

    this.init();
    this.render();
  }

  init() {
    this.$dateInput.addEventListener('click', (e) => e.stopPropagation());
  }

  render() {
    const { year, month, date } = getState({ key: storeKeys.SELECTED_HISTORY });

    this.$dateInput.innerHTML = `
    <label for="date">일자</label>
    <input type="date" name="일자" value="${
      year ? makeDateString(year, month, date) : getTodayString()
    }"/>
    `;
  }
}
