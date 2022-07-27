import { Header } from '../component/Header/Header';
import { History } from '../component/History/History';
import { InputForm } from '../component/InputForm/InputForm';
import { Modal } from '../component/Modal/Modal';
import { createPayment, deletePayment } from '../controller';

export class HistoryView {
  constructor($target) {
    this.$target = $target;

    new Header(this.$target);
    new InputForm(this.$target);
    new History(this.$target);
    new Modal(this.$target, {
      input: { readonly: false, placeholder: '입력하세요.' },
      description: '추가하실 결제수단을 선택하세요',
      button: {
        name: '등록',
        color: '#2ac1bc',
        onClick: this.onClickCreateButton,
      },
      className: 'create-payment-modal',
    });
    new Modal(this.$target, {
      input: { readonly: true, value: '현금' },
      description: '해당 결제수단을 삭제하시겠습니까?',
      button: {
        name: '삭제',
        color: '#f45452',
        onClick: this.onClickDeleteButton,
      },
      className: 'delete-payment-modal',
    });
  }

  onClickCreateButton() {
    const $modal = document.querySelector('.create-payment-modal');
    const payment = $modal.querySelector('input').value;
    createPayment(payment);
  }

  onClickDeleteButton() {
    const $modal = document.querySelector('.delete-payment-modal');
    const $payment = $modal.querySelector('input');
    if (!$payment) return;
    const paymentId = Number($payment.dataset.id);
    deletePayment(paymentId);
  }
}
