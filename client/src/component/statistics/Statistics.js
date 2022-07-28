import { CategoryColor, storeKeys } from '../../utils/constant';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import {
  getAmountSumOfCategory,
  getCostSumGroupByCategory,
  getState,
  subscribeState,
} from '../../controller';
import { getPreviousMonths } from '../../utils/date';
import { CategoryCost } from './CategoryCost/CategoryCost';
import { DonutChart } from './Chart/Donut';
import { LineChart } from './Chart/line';
import './Statistics.scss';

export class Statistics {
  constructor($target) {
    this.$target = $target;
    this.$statistics = document.createElement('main');
    this.$statistics.className = 'statistics';

    this.unsubscribeIsLoading = subscribeState({
      key: storeKeys.ISLOADING,
      callback: () => this.render(),
    });

    this.unsubscribeHistory = subscribeState({
      key: storeKeys.CURRENT_HISTORY,
      callback: () => this.render(),
    });

    this.$target.appendChild(this.$statistics);
    this.init();
    this.render();
  }

  init() {
    this.$statistics.addEventListener('click', (e) => {
      this.toggleCategoryItem(e);
    });
  }

  toggleCategoryItem(e) {
    const category = e.target.closest('tr');
    if (!category) return;

    if (category.classList.contains('active')) {
      category.classList.remove('active');
      const $lineChartContainer = this.$statistics.querySelector('.line');
      $lineChartContainer.style.display = 'none';
      $lineChartContainer.innerHTML = '';
    } else {
      this.$statistics
        .querySelectorAll('tr')
        .forEach((e) => e.classList.remove('active'));
      category.classList.add('active');
      this.showLineChart(category);
    }
  }

  async showLineChart(category) {
    const { year, month } = getState({ key: storeKeys.CURRENT_DATE });

    const categoryId = category.dataset.categoryid;
    const categoryName = category.dataset.categoryname;
    const months = getPreviousMonths(year, month, 6);
    const result = await getAmountSumOfCategory(months, categoryId);
    const data = result.map(({ year, month, amount }) => {
      return {
        label: `${year}-${month}`,
        value: amount,
      };
    });

    const $lineChartContainer = this.$statistics.querySelector('.line');
    $lineChartContainer.innerHTML = `
    <div class='title'>${categoryName} 카테고리 소비 추이</div>
    `;
    $lineChartContainer.style.display = 'flex';
    new LineChart($lineChartContainer, { data });
  }

  render() {
    const isLoading = getState({ key: storeKeys.ISLOADING });

    if (isLoading) {
      this.$statistics.innerHTML = '';
      new LoadingIndicator(this.$statistics);
      return;
    }

    const costSumGroupByCategory = getCostSumGroupByCategory();
    const chartData = costSumGroupByCategory.map(({ id, content, sum }) => {
      return { content, value: sum, color: CategoryColor[id] };
    });

    this.$statistics.innerHTML = `
      <div class='donut'></div>
      <div class='line'></div>
    `;

    new DonutChart(this.$statistics.querySelector('.donut'), {
      data: chartData,
    });
    new CategoryCost(
      this.$statistics.querySelector('.donut'),
      costSumGroupByCategory,
    );
  }
}
