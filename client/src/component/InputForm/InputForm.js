import './InputForm.scss';
import { AmountInput } from './AmountInput/AmountInput';
import CategoryInput from './CategoryInput/CategoryInput';
import { ContentInput } from './ContentInput/ContentInput';
import { DateInput } from './DateInput/DateInput';
import PaymentInput from './PaymentInput/PaymentInput';
import { getState, postHistory, putHistory } from '../../controller';
import { storeKeys } from '../../utils/constant';

export class InputForm {
  constructor($target) {
    this.$target = $target;
    this.$inpufForm = document.createElement('form');
    this.$inpufForm.className = 'inputForm';

    this.$target.appendChild(this.$inpufForm);
    this.render();
    this.init();
  }

  init() {
    this.$inpufForm.addEventListener(
      'click',
      this.onClickCheckButton.bind(this),
    );
  }

  onClickCheckButton(event) {
    event.preventDefault();
    const $button = event.target.closest('button');
    if (!$button) return;

    const $date = document.querySelector('input[name="일자"]');
    const $category = document.querySelector('input[name="type"]');
    const $content = document.querySelector('input[name="title"]');
    const $payment = document.querySelector('input[name="payment"]');
    const $isIncome = document.querySelector('input[name="isIncome"]');
    const $amount = document.querySelector('input[name="amount"]');

    const [year, month, date] = $date.value.split('-').map((d) => Number(d));
    const categoryId = Number($category.dataset.id);
    const content = $content.value;
    const paymentId = Number($payment.dataset.id);
    const amount = Number($amount.value);

    const history = {
      currentYear: 2022,
      currentMonth: 5,
      year,
      month,
      date,
      categoryId: 1,
      content,
      paymentId,
      amount,
    };
    const selectedHistory = getState({ key: storeKeys.SELECTED_HISTORY });

    if (selectedHistory.id) {
      putHistory({ ...history, id: selectedHistory.id });
    } else {
      postHistory(history);
    }
  }

  render() {
    this.$inpufForm.innerHTML = `
    <div class="inputs-wrapper">
        <div class="input-wrapper date-input-wrapper"></div>
        <div class="input-wrapper category-input-wrapper"></div>
        <div class="input-wrapper content-input-wrapper"></div>
        <div class="input-wrapper payment-input-wrapper"></div>
        <div class="input-wrapper amount-input-wrapper"></div>
    </div>
    <button>
        <svg class="check-button default" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z" fill="#2AC1BC"/>
        <path d="M29 14L16.625 26L11 20.5455" stroke="#FCFCFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>    
    </div>
    `;

    new DateInput(document.querySelector('.date-input-wrapper'));
    new CategoryInput(document.querySelector('.category-input-wrapper'));
    new ContentInput(document.querySelector('.content-input-wrapper'));
    new PaymentInput(document.querySelector('.payment-input-wrapper'));
    new AmountInput(document.querySelector('.amount-input-wrapper'));
  }
}
