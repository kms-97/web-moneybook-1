import './Header.scss';
import { dateStore, historyStore } from '../../store/store.js';
import { getMockHistory } from '../../utils/generateMockData';

export class Header {
  constructor($target) {
    this.$target = $target;
    this.$header = document.createElement('header');

    this.unsubscribeDateStore = dateStore.subscribe(() => this.render());

    this.$target.appendChild(this.$header);
    this.init();
    this.render();
  }

  init() {
    this.$header.addEventListener('click', (e) => {
      const $leftArrow = e.target.closest('.left-arrow');
      if (!$leftArrow) return;

      const { month, year } = dateStore.get();
      if (month === 1) {
        getMockHistory(12).then((result) => {
          dateStore.set({
            month: 12,
            year: year - 1,
          });
          historyStore.set([...result]);
        });
      } else {
        getMockHistory(month - 1).then((result) => {
          dateStore.set({
            year,
            month: month - 1,
          });
          historyStore.set([...result]);
        });
      }
    });

    this.$header.addEventListener('click', (e) => {
      const $rightArrow = e.target.closest('.right-arrow');
      if (!$rightArrow) return;

      const { month, year } = dateStore.get();
      if (month === 12) {
        getMockHistory(1).then((result) => {
          dateStore.set({
            month: 1,
            year: year + 1,
          });
          historyStore.set([...result]);
        });
      } else {
        getMockHistory(month + 1).then((result) => {
          dateStore.set({
            year,
            month: month + 1,
          });
          historyStore.set([...result]);
        });
      }
    });
  }

  render() {
    const { month, year } = dateStore.get();

    this.$header.innerHTML = `
        <div class="logo"><h1>우아한 가계부</h1></div>
        <div class="day-selector">
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
        </div>
        <nav class="nav">
            <button class="history-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 2V8H20" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 13H8" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 17H8" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 9H9H8" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="calendar-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 2V6" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 2V6" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 10H21" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="chart-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 20V4" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 20V14" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
        </nav>
    `;
  }
}
