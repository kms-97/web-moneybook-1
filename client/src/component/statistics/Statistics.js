import { getCostSumGroupByCategory, subscribeState } from '../../controller';
import { CategoryColor, storeKeys } from '../../utils/constant';
import { CategoryCost } from './CategoryCost/CategoryCost';
import { DonutChart } from './Chart/Donut';
import './Statistics.scss';

export class Statistics {
  constructor($target) {
    this.$target = $target;
    this.$statistics = document.createElement('main');
    this.$statistics.className = 'statistics';

    this.unsubscribeHistory = subscribeState({
      key: storeKeys.CURRENT_HISTORY,
      callback: () => this.render(),
    });

    this.$target.appendChild(this.$statistics);
    this.init();
    this.render();
  }

  init() {}

  removeAllChildNode() {
    this.$statistics.innerHTML = '';
  }

  render() {
    const costSumGroupByCategory = getCostSumGroupByCategory();
    const chartData = costSumGroupByCategory.map(({ id, content, sum }) => {
      return { content, value: sum, color: CategoryColor[id] };
    });

    this.removeAllChildNode();
    new DonutChart(this.$statistics, chartData);
    new CategoryCost(this.$statistics, costSumGroupByCategory);
  }
}
