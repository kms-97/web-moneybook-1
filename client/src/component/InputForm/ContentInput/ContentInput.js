import { getState } from '../../../store';
import { storeKeys } from '../../../utils/constant';

export class ContentInput {
  constructor($target) {
    this.$target = $target;
    this.$contentInput = document.createElement('div');
    this.$target.appendChild(this.$contentInput);

    this.init();
    this.render();
  }

  init() {}

  render() {
    const history = getState({ key: storeKeys.SELECTED_HISTORY });

    this.$contentInput.innerHTML = `<label for="type">내용</label>
    <input type="text" name="title" placeholder="입력하세요" value="${
      history?.content ?? ''
    }"maxlength="20"/>`;
  }
}
