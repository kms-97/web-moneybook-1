import { getState } from '../../../controller';
import Component from '../../../core/Component';
import { storeKeys } from '../../../utils/constant';

export class AmountInput extends Component {
  constructor($parent) {
    super($parent, 'div');
  }

  attachEvents() {
    this.$self.addEventListener('click', (e) => {
      this.onClickIsIncome(e);
    });
  }

  onChangeIsIncome() {
    const $isIncome = this.$self.querySelector('#isIncome');

    const $inputType = this.$parent.querySelector('input[name="type"]');
    $inputType.value = '';
    $inputType.dataset.id = '';

    const $dropdown = this.$parent.querySelector('.dropdown');
    $dropdown.innerHTML = getState({ key: storeKeys.CATEGORY })
      .filter(({ isIncome }) => Boolean(isIncome) === $isIncome.checked)
      .map(
        ({ id, content }) => `
            <li data-id=${id}>${content}</li>
            <div class="border"></div>`,
      )
      .join('');
  }

  onClickIsIncome(event) {
    event.stopPropagation();
    const $isIncome = event.target.closest('#isIncome');
    if (!$isIncome) return;
    this.onChangeIsIncome();
  }

  render() {
    const history = getState({ key: storeKeys.SELECTED_HISTORY });
    this.$self.innerHTML = `
    <label for="type">금액</label>
    <div class="field">
        <input type="checkbox" name="isIncome" id='isIncome' ${
          history.isIncome === 1 ? 'checked' : ''
        }>
        <label for='isIncome' id='isIncomeLabel'></label>
        <input type="text" name="amount" placeholder="입력하세요" autocomplete="off" value="${
          history.amount ?? ''
        }"/>원
    </div>`;
  }
}
