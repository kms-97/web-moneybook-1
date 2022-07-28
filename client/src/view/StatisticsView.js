import { Header } from '../component/Header/Header';
import { Statistics } from '../component/statistics/Statistics';

export class StatisticsView {
  constructor($target) {
    this.$target = $target;

    new Header(this.$target);
    new Statistics(this.$target);
  }

  init() {}

  render() {}
}
