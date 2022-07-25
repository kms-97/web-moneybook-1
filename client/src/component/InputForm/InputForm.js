import { categoryStore, selectedHistoryStore } from '../../store/store';
import CategoryInput from './CategoryInput/CategoryInput';
import './InputForm.scss';
import PaymentInput from './PaymentInput/PaymentInput';

export class InputForm {
  constructor($target) {
    this.$target = $target;
    this.$inpufForm = document.createElement('form');
    this.$inpufForm.className = 'inputForm';

    selectedHistoryStore.subscribe(() => this.render());

    this.$target.appendChild(this.$inpufForm);
    this.render();
    this.init();
  }

  /** 이벤트 바인딩 */
  init() {
    // this.$inpufForm.addEventListener('change', this.onClickIsIncome);
    this.$inpufForm.addEventListener('click', this.onClickIsIncome.bind(this));
    this.$inpufForm.addEventListener(
      'click',
      this.onClickDropdownField.bind(this),
    );
    this.$inpufForm.addEventListener(
      'click',
      this.onClickCategoryItem.bind(this),
    );
    this.$inpufForm.addEventListener(
      'click',
      this.onClickPaymentItem.bind(this),
    );
  }

  /** 이벤트 핸들러 */
  onChangeIsIncome() {
    const $isIncome = document.querySelector('#isIncome');

    console.log($isIncome, $isIncome.checked);
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
    this.onChangeIsIncome();
  }

  onClickCategoryItem(event) {
    const $li = event.target.closest('.inputForm .category>li');
    if (!$li) return;

    const $inputType = document.querySelector('input[name="type"]');
    $inputType.value = $li.innerHTML;
    $inputType.dataset.id = $li.dataset.id;

    const $category = document.querySelector('.inputForm .category');
    $category.style.display = 'none';
  }

  onClickPaymentItem(event) {
    const $li = event.target.closest('.inputForm .payment>li');
    if (!$li) return;

    const $inputType = document.querySelector('input[name="payment"]');

    if (!$li.dataset.name) {
      // 추가하기 버튼
      return;
    }
    $inputType.value = $li.dataset.name;
    $inputType.dataset.id = $li.dataset.id;

    const $payment = document.querySelector('.inputForm .payment');
    $payment.style.display = 'none';
  }

  /** 부가 기능 */
  initDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, 0);
    const day = today.getDate().toString().padStart(2, 0);

    return `${year}-${month}-${day}`;
  }

  render() {
    const history = selectedHistoryStore.get();

    this.$inpufForm.innerHTML = `
    <div class="inputs-wrapper">
        <div class="input-wrapper">
            <label for="date">일자</label>
            <input type="date" name="일자" value="${
              history.date ?? this.initDate()
            }"/>
        </div>

        <div class="input-wrapper category-input-wrapper"></div>

        <div class="input-wrapper">
            <label for="type">내용</label>
            <input type="text" name="title" placeholder="입력하세요" value="${
              history?.content ?? ''
            }"maxlength="20"/>
        </div>

        <div class="input-wrapper payment-input-wrapper"></div>

        <div class="input-wrapper">
            <label for="type">금액</label>
            <div class="field">
                <input type="checkbox" name="isIncome" id='isIncome' ${
                  history.isIncome !== false ? 'checked' : ''
                }></input>
                <label for='isIncome'></label>
                <input type="text" name="amount" placeholder="입력하세요" autocomplete="off" value="${
                  history.amount ?? ''
                }"/>원
            </div>
        </div>
    </div>
    <button>
        <svg class="check-button default" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z" fill="#2AC1BC"/>
        <path d="M29 14L16.625 26L11 20.5455" stroke="#FCFCFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>    
    </div>
    `;

    new CategoryInput(document.querySelector('.category-input-wrapper'));
    new PaymentInput(document.querySelector('.payment-input-wrapper'));
  }
}
