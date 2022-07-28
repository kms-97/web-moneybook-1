import './History.scss';
import { List } from './List/List';
import { Filter } from './Filter/Filter';
import { Count } from './Count/Count';
import Component from '../../core/Component';

export class History extends Component {
  constructor($parent) {
    super($parent, 'main', { class: 'history-view' });
  }

  render() {
    this.$self.innerHTML = `
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
