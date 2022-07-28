import './InputForm.scss';
import { AmountInput } from './AmountInput/AmountInput';
import CategoryInput from './CategoryInput/CategoryInput';
import { ContentInput } from './ContentInput/ContentInput';
import { DateInput } from './DateInput/DateInput';
import PaymentInput from './PaymentInput/PaymentInput';
import {
  changeSelectedHistory,
  getState,
  postHistory,
  putHistory,
} from '../../controller';
import { storeKeys } from '../../utils/constant';
import { getTodayString } from '../../utils/date';
import Component from '../../core/Component';

export class InputForm extends Component {
  constructor($parent) {
    super($parent, 'form', { class: 'inputForm' });

    this.subscribeState([storeKeys.SELECTED_HISTORY]);
  }

  attachEvents() {
    this.$self.addEventListener('click', (e) => {
      this.onClickCheckButton(e);
    });

    this.$self.addEventListener('input', () => {
      this.isAllFieldCorrect();
    });

    this.$self.addEventListener('click', () => {
      this.isAllFieldCorrect();
    });
  }

  isAllFieldCorrect() {
    const $category = this.$self.querySelector('input[name="type"]');
    const $content = this.$self.querySelector('input[name="title"]');
    const $payment = this.$self.querySelector('input[name="payment"]');
    const $amount = this.$self.querySelector('input[name="amount"]');
    const $checkButton = this.$self.querySelector('.check-button');

    try {
      const categoryId = Number($category.dataset.id);
      const paymentId = Number($payment.dataset.id);
      if (categoryId === 0 || paymentId === 0)
        throw new Error('categoryId, paymentId를 입력하세요.');

      const content = $content.value;
      if (!content) throw new Error('content를 입력하세요.');

      const amount = Number($amount.value);
      if ($amount.value === '' || isNaN(amount))
        throw new Error('amount를 입력하세요.');

      $checkButton.classList.add('active');
    } catch (error) {
      $checkButton.classList.remove('active');
      $checkButton.disabled = true;
    }
  }

  onClickCheckButton(event) {
    event.preventDefault();
    const $button = event.target.closest('button');
    if (!$button) return;
    if (!$button.classList.contains('active')) return;

    const $date = this.$self.querySelector('input[name="일자"]');
    const $category = this.$self.querySelector('input[name="type"]');
    const $content = this.$self.querySelector('input[name="title"]');
    const $payment = this.$self.querySelector('input[name="payment"]');
    const $amount = this.$self.querySelector('input[name="amount"]');

    const currentDate = getState({ key: storeKeys.CURRENT_DATE });
    const [year, month, date] = $date.value.split('-').map((d) => Number(d));
    const categoryId = Number($category.dataset.id);
    const content = $content.value;
    const paymentId = Number($payment.dataset.id);
    const amount = Number($amount.value);

    const history = {
      currentYear: currentDate.year,
      currentMonth: currentDate.month,
      year,
      month,
      date,
      categoryId,
      content,
      paymentId,
      amount,
    };
    const selectedHistory = getState({ key: storeKeys.SELECTED_HISTORY });

    if (selectedHistory.id) {
      putHistory({ ...history, id: selectedHistory.id }, () => {
        changeSelectedHistory({ id: null });
        const $checkButton = this.$self.querySelector('.check-button');
        $checkButton.classList.remove('active');
        document
          .querySelectorAll('ul[class=list] tr.active')
          .forEach((item) => item.classList.remove('active'));
      });
    } else {
      postHistory(history, this.initInputs.bind(this));
    }
  }

  initInputs() {
    const $date = this.$self.querySelector('input[name="일자"]');
    const $category = this.$self.querySelector('input[name="type"]');
    const $content = this.$self.querySelector('input[name="title"]');
    const $payment = this.$self.querySelector('input[name="payment"]');
    const $amount = this.$self.querySelector('input[name="amount"]');

    $date.value = getTodayString();
    $category.dataset.id = '';
    $category.value = '';
    $content.value = '';
    $payment.value = '';
    $payment.dataset.id = '';
    $amount.value = '';

    const $checkButton = this.$self.querySelector('.check-button');
    $checkButton.classList.remove('active');
  }

  render() {
    this.$self.innerHTML = `
    <div class="inputs-wrapper">
        <div class="input-wrapper date-input-wrapper"></div>
        <div class="input-wrapper category-input-wrapper"></div>
        <div class="input-wrapper content-input-wrapper"></div>
        <div class="input-wrapper payment-input-wrapper"></div>
        <div class="input-wrapper amount-input-wrapper"></div>
    </div>
    <button class="check-button default" >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29 14L16.625 26L11 20.5455" stroke="#FCFCFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>    
    </div>
    `;

    new DateInput(this.$self.querySelector('.date-input-wrapper'));
    new CategoryInput(this.$self.querySelector('.category-input-wrapper'));
    new ContentInput(this.$self.querySelector('.content-input-wrapper'));
    new PaymentInput(this.$self.querySelector('.payment-input-wrapper'));
    new AmountInput(this.$self.querySelector('.amount-input-wrapper'));
  }
}
