import { getState } from '../../../controller';
import { storeKeys } from '../../../utils/constant';

export class AmountInput {
  constructor($target) {
    this.$target = $target;
    this.$amountInput = document.createElement('div');
    this.$target.appendChild(this.$amountInput);

    this.init();
    this.render();
  }

  init() {
    this.$amountInput.addEventListener(
      'click',
      this.onClickIsIncome.bind(this),
    );
  }

  onChangeIsIncome() {
    const $isIncome = document.querySelector('#isIncome');

    const $inputType = document.querySelector('input[name="type"]');
    $inputType.value = '';
    $inputType.dataset.id = '';

    const $dropdown = document.querySelector('.dropdown');

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
    this.$amountInput.innerHTML = `
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
