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
            <input type='checkbox' checked>
            <div>수입 1,822,480</div>
          </li>
          <li>
            <input type='checkbox' checked>
            <div>지출 798,180</div>
          </li>
        </ul>
      </div>
      <ul class="list"></ul>
    `;
  }
}
