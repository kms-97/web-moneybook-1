import './History.scss';
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
