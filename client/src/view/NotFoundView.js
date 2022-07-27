import { Error } from '../component/Error/Error';
import { Header } from '../component/Header/Header';

export class NotFoundView {
  constructor($target) {
    this.$target = $target;

    new Header(this.$target);
    new Error(this.$target, 404, '페이지를 찾을 수 없습니다.');
  }

  init() {}

  render() {}
}
