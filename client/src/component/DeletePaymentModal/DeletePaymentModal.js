import { deletePayment } from '../../controller';
import './DeletePaymentModal.scss';

export class DeletePaymentModal {
  constructor($target) {
    this.$target = $target;
    this.$deletePaymentModal = document.createElement('div');
    this.$deletePaymentModal.className = 'delete-payment-modal';

    this.$target.appendChild(this.$deletePaymentModal);
    this.init();
    this.render();
  }

  init() {
    this.$deletePaymentModal.addEventListener('click', (event) =>
      this.onClickCancelButton(event),
    );

    this.$deletePaymentModal.addEventListener('click', (event) =>
      this.onClickDeleteButton(event),
    );
  }

  onClickCancelButton(event) {
    const $cancelButton = event.target.closest('.cancel-button');
    if (!$cancelButton) return;
    this.$deletePaymentModal.style.display = 'none';
  }

  onClickDeleteButton(event) {
    const $deleteButton = event.target.closest('.delete-button');
    if (!$deleteButton) return;
    const $payment = this.$deletePaymentModal.querySelector(
      'input[name="payment"]',
    );
    if (!$payment) return;
    const paymentId = Number($payment.dataset.id);
    deletePayment(paymentId, () => {
      this.$deletePaymentModal.style.display = 'none';
    });
  }

  // 삭제 버튼 클릭 시 modal 열고, data-id와 value를 세팅
  render() {
    this.$deletePaymentModal.innerHTML = `
    <div class="payment-input-wrapper">
      <span class="description">삭제하실 결제수단을 적어주세요.</span>
      <input type="text" name="payment" placeholder="입력하세요." autocomplete="off" readonly>
      <div class="button-wrapper">
        <button class="cancel-button">취소</button>
        <button class="delete-button">삭제</button>
      </div>
    </div>`;
  }
}
