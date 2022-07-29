import {
  getCostSumCurrentMonth,
  getIncomeSumCurrentMonth,
} from '../../../controller';
import Component from '../../../core/Component';

export default class CalendarFooter extends Component {
  constructor($parent) {
    super($parent, 'div', { class: 'calendar-footer' });
  }

  render() {
    const income = getIncomeSumCurrentMonth();
    const cost = getCostSumCurrentMonth();
    this.$self.innerHTML = `
      <div class='sum'>
          <div class='income'>총 수입 ${income.toLocaleString()}</div>
          <div class='cost'>총 지출 ${cost.toLocaleString()}</div>
      </div>
      <div class='total'>총계 ${(income - cost).toLocaleString()}</div>
    `;
  }
}
