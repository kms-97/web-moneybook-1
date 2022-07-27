import {
  decreaseMonth,
  getState,
  increaseMonth,
  subscribeState,
} from '../../../controller';
import { storeKeys } from '../../../utils/constant';

export default class DaySelector {
  constructor($target) {
    this.$target = $target;

    this.$daySelector = document.createElement('div');
    this.$daySelector.className = 'day-selector';

    this.unsubscribeDate = subscribeState({
      key: storeKeys.CURRENT_DATE,
      callback: () => this.render(),
    });

    this.$target.appendChild(this.$daySelector);
    this.init();
    this.render();
  }

  onClickRightArrow(e) {
    const $rightArrow = e.target.closest('.right-arrow');
    if (!$rightArrow) return;

    increaseMonth();
  }

  onClickLeftArrow(e) {
    const $leftArrow = e.target.closest('.left-arrow');
    if (!$leftArrow) return;

    decreaseMonth();
  }

  init() {
    this.$daySelector.addEventListener('click', this.onClickLeftArrow);
    this.$daySelector.addEventListener('click', this.onClickRightArrow);
  }

  render() {
    const { month, year } = getState({ key: storeKeys.CURRENT_DATE });

    this.$daySelector.innerHTML = `
      <button class="left-arrow">
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17L1 9L9 1" stroke="#FCFCFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="date">
          <div class="month">${month}월</div>
          <div class="year">${year}</div>
      </div>
      <button class="right-arrow">
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 17L9 9L1 1" stroke="#FCFCFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
  `;
  }
}
