import { selectedHistoryStore } from '../../../store/store';

export class ContentInput {
  constructor($target) {
    this.$target = $target;
    this.$contentInput = document.createElement('div');
    this.$target.appendChild(this.$contentInput);

    selectedHistoryStore.subscribe(() => this.render());

    this.init();
    this.render();
  }

  init() {}

  render() {
    const history = selectedHistoryStore.get();

    this.$contentInput.innerHTML = `<label for="type">내용</label>
    <input type="text" name="title" placeholder="입력하세요" value="${
      history?.content ?? ''
    }"maxlength="20"/>`;
  }
}
