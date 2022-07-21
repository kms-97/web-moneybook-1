import './History.scss';

export class History {
  constructor($target) {
    this.$target = $target;
    this.$history = document.createElement('main');

    this.$target.appendChild(this.$history);
    this.render();
  }

  init() {}

  sendNotify() {}

  render() {
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
        <li>
          <div class='subtitle'>
            <div class='date'>7월 15일 <span class='week'>목</span></div>
            <div class='sum'>
                <div class='income'>수입 12,324</div>
                <div class='cost'>지출 583,495</div>
            </div>
          </div>
          <table class='item'>
            <tr class='active'>
                <td class='category'><span class='culture'>문화/여가</span></td>
                <td class='content'>세미나 신청</td>
                <td class='payment'>현대카드</td>
                <td class='amount'>50,000</td>
            </tr>
            <tr>
                <td class='category'><span class='traffic'>교통</span></td>
                <td class='content'>세미나 신청</td>
                <td class='payment'>현대카드</td>
                <td class='amount income'>1,250,000</td>
            </tr>
          </table>
        </li>
        <li>
            <div class='subtitle'>
            <div class='date'>7월 14일 <span class='week'>수</span></div>
            <div class='sum'>
                <div class='income'>수입 12,324</div>
                <div class='cost'>지출 583,495</div>
            </div>
            </div>
            <table class='item'>
            <tr>
                <td class='category'><span class='food'>식비</span></td>
                <td class='content'>세미나 신청</td>
                <td class='payment'>현대카드</td>
                <td class='amount cost'>50,000</td>
            </tr>
            </table>
        </li>
      </ul>
    `;
  }
}
