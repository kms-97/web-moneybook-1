import './History.scss';
import { changeSelectedHistory } from '../../controller';
import { storeKeys } from '../../utils/constant';
import { List } from './List/List';
import { Filter } from './Filter/Filter';
import { Count } from './Count/Count';

export class History {
  constructor($target) {
    this.$target = $target;
    this.$history = document.createElement('main');
    this.$history.className = 'history-view';

    this.$target.appendChild(this.$history);
    this.render();
    this.init();
  }

  init() {
    this.$history.addEventListener('click', (e) => {
      const $tr = e.target.closest('tr');
      if (!$tr) return;

      // .active 클래스 붙이기

      // set selected history
      const trId = Number($tr.dataset.id);
      changeSelectedHistory({ id: trId });
    });
  }

  render() {
    this.$history.innerHTML = `
      <div class="title">
        <div class="count-wrapper"></div>
        <div class="filter-wrapper"></div>
      </div>
      <div class="list-wrapper"></div>
    `;
    new Count(document.querySelector('.count-wrapper'));
    new List(document.querySelector('.list-wrapper'));
    new Filter(document.querySelector('.filter-wrapper'));
  }
}
