import Component from '../../../core/Component';
import { getState } from '../../../store';
import { storeKeys } from '../../../utils/constant';
import { makeDateString, getTodayString } from '../../../utils/date';

export class DateInput extends Component {
  constructor($parent) {
    super($parent, 'div');
  }

  attachEvents() {
    this.$self.addEventListener('click', (e) => e.stopPropagation());
  }

  render() {
    const { year, month, date } = getState({ key: storeKeys.SELECTED_HISTORY });

    this.$self.innerHTML = `
    <label for="date">일자</label>
    <input type="date" name="일자" value="${
      year ? makeDateString(year, month, date) : getTodayString()
    }"/>
    `;
  }
}
