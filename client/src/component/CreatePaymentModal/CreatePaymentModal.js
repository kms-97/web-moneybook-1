import { createPayment } from '../../controller';
import './CreatePaymentModal.scss';

export class CreatePaymentModal {
  constructor($target) {
    this.$target = $target;
    this.$paymentModal = document.createElement('div');
    this.$paymentModal.className = 'payment-modal';

    this.$target.appendChild(this.$paymentModal);
    this.init();
    this.render();
  }

  init() {
    this.$paymentModal.addEventListener('click', (event) =>
      this.onClickCreateButton(event),
    );
    this.$paymentModal.addEventListener('input', (event) => {
      const $payment = this.$paymentModal.querySelector('input[name=payment]');
      $payment.value = event.target.value;
    });
    this.$paymentModal.addEventListener('click', (event) =>
      this.onClickCancelButton(event),
    );
  }

  onClickCreateButton(event) {
    const $createButton = event.target.closest('.create-button');
    if (!$createButton) return;
    const payment = this.$paymentModal.querySelector(
      'input[name=payment]',
    ).value;

    createPayment(payment, () => this.closeModal());
  }

  onClickCancelButton(event) {
    const $cancelButton = event.target.closest('.cancel-button');
    if (!$cancelButton) return;
    this.closeModal();
  }

  closeModal() {
    this.$paymentModal.style.display = 'none';
    const $payment = this.$paymentModal.querySelector('input[name=payment]');
    $payment.value = '';
  }

  render() {
    this.$paymentModal.innerHTML = `
    <div class="payment-input-wrapper">
      <span class="description">추가하실 결제수단을 적어주세요.</span>
      <input type="text" name="payment" placeholder="입력하세요." autocomplete="off">
      <div class="button-wrapper">
        <button class="cancel-button">취소</button>
        <button class="create-button">등록</button>
      </div>
    </div>`;
  }
}
