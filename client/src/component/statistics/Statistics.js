import './Statistics.scss';
import {
  getAmountSumOfCategory,
  getCostSumGroupByCategory,
  getState,
} from '../../controller';
import { CategoryColor, storeKeys } from '../../utils/constant';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import { getPreviousMonths } from '../../utils/date';
import { CategoryCost } from './CategoryCost/CategoryCost';
import { DonutChart } from './Chart/Donut';
import { LineChart } from './Chart/Line';
import Component from '../../core/Component';

export class Statistics extends Component {
  constructor($parent) {
    super($parent, 'main', { class: 'statistics' });

    this.subscribeState([storeKeys.CURRENT_HISTORY, storeKeys.ISLOADING]);
  }

  attachEvents() {
    this.$self.addEventListener('click', (e) => {
      this.toggleCategoryItem(e);
    });
  }

  toggleCategoryItem(e) {
    const category = e.target.closest('tr');
    if (!category) return;

    if (category.classList.contains('active')) {
      category.classList.remove('active');
      const $lineChartContainer = this.$self.querySelector('.line');
      $lineChartContainer.style.display = 'none';
      $lineChartContainer.innerHTML = '';
    } else {
      this.$self
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

    const $lineChartContainer = this.$self.querySelector('.line');
    $lineChartContainer.innerHTML = `
    <div class='title'>${categoryName} 카테고리 소비 추이</div>
    `;
    $lineChartContainer.style.display = 'flex';
    new LineChart($lineChartContainer, { data });
  }

  render() {
    const isLoading = getState({ key: storeKeys.ISLOADING });

    if (isLoading) {
      this.$self.innerHTML = '';
      new LoadingIndicator(this.$self);
      return;
    }

    const costSumGroupByCategory = getCostSumGroupByCategory();
    const chartData = costSumGroupByCategory.map(({ id, content, sum }) => {
      return { content, value: sum, color: CategoryColor[id] };
    });

    this.$self.innerHTML = `
      <div class='donut'></div>
      <div class='line'></div>
    `;

    new DonutChart(this.$self.querySelector('.donut'), {
      data: chartData,
    });
    new CategoryCost(
      this.$self.querySelector('.donut'),
      costSumGroupByCategory,
    );
  }
}
