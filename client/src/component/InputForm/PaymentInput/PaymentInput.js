import { getState, subscribeState } from '../../../controller';
import { storeKeys } from '../../../utils/constant';

export default class PaymentInput {
  constructor($target) {
    this.$target = $target; // $inputForm
    this.$paymentInput = document.createElement('div');

    this.unsubscribeSelectedHistory = subscribeState({
      key: storeKeys.SELECTED_HISTORY,
      callback: () => this.render(),
    });
    this.unsubscribePayment = subscribeState({
      key: storeKeys.PAYMENT,
      callback: () => this.render(),
    });

    this.$target.appendChild(this.$paymentInput);
    this.render();
    this.init();
  }

  init() {
    this.$paymentInput.addEventListener(
      'click',
      this.onClickPaymentItem.bind(this),
    );
    this.$paymentInput.addEventListener('click', this.onClickDropdownField);
    this.$paymentInput.addEventListener(
      'click',
      this.onClickPaymentItemDeleteButton.bind(this),
    );
  }

  onClickPaymentItem(event) {
    const $li = event.target.closest('.inputForm .payment>li');
    if (!$li) return;

    const $inputType = document.querySelector('input[name="payment"]');

    if ($li.dataset.name === '추가') {
      // 추가하기 버튼
      const $paymentModal = document.querySelector('.payment-modal');
      this.openModal($paymentModal);
      return;
    }
    $inputType.value = $li.dataset.name;
    $inputType.dataset.id = $li.dataset.id;

    const $payment = document.querySelector('.inputForm .payment');
    $payment.style.display = 'none';
  }

  onClickDropdownField(event) {
    const $field = event.target.closest('.field');
    if (!$field) return;

    const $dropdown = $field.nextElementSibling;
    if (!$dropdown || !$dropdown.className.includes('dropdown')) return;

    $dropdown.style.display =
      ($dropdown.style.display === 'none') | ($dropdown.style.display === '')
        ? 'block'
        : 'none';

    if (!$field) return;
    const $categoryDropdown = $field.nextElementSibling.className.includes(
      'category',
    )
      ? $field.nextElementSibling
      : null;
    if (!$categoryDropdown) return;
  }

  onClickPaymentItemDeleteButton(event) {
    event.preventDefault();
    const $deleteButton = event.target.closest('.delete-button');
    if (!$deleteButton) return;

    const $li = event.target.closest('li');
    if (!$li) return;

    const $deletePaymentModal = document.querySelector('.delete-payment-modal');
    this.openModal($deletePaymentModal);

    const $input = $deletePaymentModal.querySelector('input[name="payment"]');

    $input.value = $li.dataset.name;
    $input.dataset.id = $li.dataset.id;
  }

  openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  render() {
    const history = getState({ key: storeKeys.SELECTED_HISTORY });
    const payment = getState({ key: storeKeys.PAYMENT });

    this.$paymentInput.innerHTML = `
      <label for="type">결제수단</label>
      <div class="field">
          <input type="text" name="payment" placeholder="선택하세요" value="${
            payment.filter(({ id }) => id === history.paymentId)[0]?.content ??
            ''
          }" data-id="${history.paymentId ?? ''}" readonly />
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6.5L8 10.5L12 6.5" stroke="#8D9393" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      </div>
      <ul class="payment dropdown">
      ${payment
        .map(
          ({ id, content }) => `
              <li data-id=${id} data-name="${content}">
                ${content}
                <button class="delete-button">X</button>
              </li>
              <div class="border"></div>`,
        )
        .join('')}
          <li data-name="추가">추가하기</li>
      </ul>
  `;
  }
}
