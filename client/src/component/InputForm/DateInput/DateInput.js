import { selectedHistoryStore } from '../../../store/store';

export class DateInput {
  constructor($target) {
    this.$target = $target;
    this.$dateInput = document.createElement('div');
    this.$target.appendChild(this.$dateInput);

    selectedHistoryStore.subscribe(() => this.render());

    this.init();
    this.render();
  }

  init() {}

  /** 부가 기능 */
  initDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, 0);
    const day = today.getDate().toString().padStart(2, 0);

    return `${year}-${month}-${day}`;
  }

  render() {
    const history = selectedHistoryStore.get();
    this.$dateInput.innerHTML = `
    <label for="date">일자</label>
    <input type="date" name="일자" value="${history.date ?? this.initDate()}"/>
    `;
  }
}
