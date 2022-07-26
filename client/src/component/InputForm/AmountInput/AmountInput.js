import { getState } from '../../../controller';
import { subscribeState } from '../../../store';
import { storeKeys } from '../../../utils/constant';

export class AmountInput {
  constructor($target) {
    this.$target = $target;
    this.$amountInput = document.createElement('div');
    this.$target.appendChild(this.$amountInput);

    this.unsubcribeState = subscribeState({
      key: storeKeys.SELECTED_HISTORY,
      callback: () => this.render(),
    });

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

    $dropdown.innerHTML = categoryStore
      .get()
      .filter(({ isIncome }) => isIncome === $isIncome.checked)
      .map(
        ({ id, content }) => `
            <li data-id=${id}>${content}</li>
            <div class="border"></div>`,
      )
      .join('');
  }

  onClickIsIncome(event) {
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
          history.isIncome !== false ? 'checked' : ''
        }></input>
        <label for='isIncome'></label>
        <input type="text" name="amount" placeholder="입력하세요" autocomplete="off" value="${
          history.amount ?? ''
        }"/>원
    </div>`;
  }
}
