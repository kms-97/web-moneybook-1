import Component from '../../../core/Component';
import { getState } from '../../../store';
import { storeKeys } from '../../../utils/constant';

export class ContentInput extends Component {
  constructor($parent) {
    super($parent, 'div');
  }

  render() {
    const history = getState({ key: storeKeys.SELECTED_HISTORY });

    this.$self.innerHTML = `<label for="type">내용</label>
    <input type="text" name="title" placeholder="입력하세요" value="${
      history?.content ?? ''
    }"maxlength="20"/>`;
  }
}
