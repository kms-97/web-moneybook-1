import { createPayment, deletePayment, getState } from '../../../controller';
import Component from '../../../core/Component';
import { storeKeys } from '../../../utils/constant';
import { Modal } from '../../Modal/Modal';

export default class PaymentInput extends Component {
  constructor($parent) {
    super($parent, 'div');

    this.subscribeState([storeKeys.PAYMENT]);
  }

  attachEvents() {
    this.$self.addEventListener('click', (e) => {
      this.onClickPaymentItem(e);
    });

    this.$self.addEventListener('click', (e) => {
      this.onClickDropdownField(e);
    });

    this.$self.addEventListener('click', (e) => {
      this.onClickPaymentItemDeleteButton(e);
    });
  }

  onClickPaymentItem(event) {
    const $li = event.target.closest('.inputForm .payment>li');
    if (!$li) return;

    const $inputType = this.$self.querySelector('input[name="payment"]');

    if ($li.dataset.name === '추가') {
      this.openCreateModal();
      return;
    }
    $inputType.value = $li.dataset.name;
    $inputType.dataset.id = $li.dataset.id;

    const $payment = this.$self.querySelector('.payment');
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

    const selectedPayment = $li.dataset.name;
    this.openDeleteModal(selectedPayment);
  }

  openCreateModal() {
    function onClickCreateButton(value) {
      const payment = value;
      createPayment(payment);
    }
    new Modal({
      input: { readonly: false, placeholder: '입력하세요.' },
      description: '추가하실 결제수단을 선택하세요',
      button: {
        name: '등록',
        color: '#2ac1bc',
        onClick: onClickCreateButton,
      },
    });
  }

  openDeleteModal(value) {
    function onClickDeleteButton(value) {
      const payment = value;
      deletePayment(payment);
    }
    new Modal({
      input: { readonly: true, value },
      description: '선택하신 결제수단을 삭제할까요?',
      button: {
        name: '삭제',
        color: '#f45452',
        onClick: onClickDeleteButton,
      },
    });
  }

  render() {
    const history = getState({ key: storeKeys.SELECTED_HISTORY });
    const payment = getState({ key: storeKeys.PAYMENT });

    this.$self.innerHTML = `
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
