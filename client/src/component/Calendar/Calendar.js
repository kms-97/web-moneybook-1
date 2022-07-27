import './Calendar.scss';

export class Calendar {
  constructor($target) {
    this.$target = $target;
    this.$calendar = document.createElement('main');
    this.$calendar.className = 'calendar-view';

    this.$target.appendChild(this.$calendar);
    this.init();
    this.render();
  }

  init() {}

  render() {
    this.$calendar.innerHTML = `
        <div class='calendar-header'>
            <div class='calendar-header-day sunday'>일</div>
            <div class='calendar-header-day'>월</div>
            <div class='calendar-header-day'>화</div>
            <div class='calendar-header-day'>수</div>
            <div class='calendar-header-day'>목</div>
            <div class='calendar-header-day'>금</div>
            <div class='calendar-header-day saturday'>토</div>
        </div>
        <table class='calendar-body'>
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
        </table>
    `;
  }
}
