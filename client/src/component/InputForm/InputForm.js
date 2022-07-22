import {
  categoryStore,
  selectedHistoryStore,
  paymentStore,
} from '../../store/store';
import './InputForm.scss';

export class InputForm {
  constructor($target) {
    this.$target = $target;
    this.$inpufForm = document.createElement('form');
    this.$inpufForm.className = 'inputForm';

    selectedHistoryStore.subscribe(() => this.render());
    paymentStore.subscribe(() => this.render());

    this.$target.appendChild(this.$inpufForm);
    this.render();
    this.init();
  }

  init() {
    this.$inpufForm.addEventListener('change', (event) => {
      const $isIncome = event.target.closest('#isIncome');
      if (!$isIncome) return;

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
    });

    this.$inpufForm.addEventListener('click', (event) => {
      const $field = event.target.closest('.field');
      if (!$field) return;

      const $dropdown = $field.nextElementSibling;
      if (!$dropdown || !$dropdown.className.includes('dropdown')) return;

      $dropdown.style.display =
        ($dropdown.style.display === 'none') | ($dropdown.style.display === '')
          ? 'block'
          : 'none';
    });

    this.$inpufForm.addEventListener('click', (event) => {
      const $field = event.target.closest('.field');
      if (!$field) return;
      const $dropdown = $field.nextElementSibling.className.includes('category')
        ? $field.nextElementSibling
        : null;
      if (!$dropdown) return;

      const $isIncome = document.querySelector('#isIncome');
      $dropdown.innerHTML = categoryStore
        .get()
        .filter(({ isIncome }) => isIncome === $isIncome.checked)
        .map(
          ({ id, content }) => `
              <li data-id=${id}>${content}</li>
              <div class="border"></div>`,
        )
        .join('');
    });

    this.$inpufForm.addEventListener('click', (event) => {
      const $li = event.target.closest('.inputForm .category>li');
      if (!$li) return;

      const $inputType = document.querySelector('input[name="type"]');
      $inputType.value = $li.innerHTML;
      $inputType.dataset.id = $li.dataset.id;

      const $category = document.querySelector('.inputForm .category');
      $category.style.display = 'none';
    });

    this.$inpufForm.addEventListener('click', (event) => {
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
    });
  }

  initDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, 0);
    const day = today.getDate().toString().padStart(2, 0);

    return `${year}-${month}-${day}`;
  }

  render() {
    const history = selectedHistoryStore.get();
    const payment = paymentStore.get();
    const category = categoryStore.get();

    console.log(history);

    this.$inpufForm.innerHTML = `
    <div class="inputs-wrapper">
        <div class="input-wrapper">
            <label for="date">일자</label>
            <input type="date" name="일자" value="${
              history.date ?? this.initDate()
            }"/>
        </div>

        <div class="input-wrapper">
            <label for="type">분류</label>
            <div class="field">
                <input type="text" name="type" placeholder="선택하세요" value="${
                  category.filter(({ id }) => id === history.categoryId)[0]
                    ?.content ?? ''
                }" date-id="${history.categoryId ?? ''}" readonly/>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6.5L8 10.5L12 6.5" stroke="#8D9393" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>

            <ul class="category dropdown">
            ${categoryStore
              .get()
              .filter(({ isIncome }) => isIncome === true)
              .map(
                ({ id, content }) => `
                    <li data-id=${id}>${content}</li>
                    <div class="border"></div>`,
              )
              .join('')}
            </ul>
        </div>
        <div class="input-wrapper">
            <label for="type">내용</label>
            <input type="text" name="title" placeholder="입력하세요" value="${
              history?.content ?? ''
            }"maxlength="20"/>
        </div>

        <div class="input-wrapper">
            <label for="type">결제수단</label>
            <div class="field">
                <input type="text" name="payment" placeholder="선택하세요" value="${
                  payment.filter(({ id }) => id === history.paymentId)[0]
                    ?.content ?? ''
                }" data-id="${history.paymentId ?? ''}" readonly />
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6.5L8 10.5L12 6.5" stroke="#8D9393" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <ul class="payment dropdown">
            ${paymentStore
              .get()
              .map(
                ({ id, content }) => `
                    <li data-id=${id} data-name="${content}">
                      ${content}
                      <button>X</button>
                    </li>
                    <div class="border"></div>`,
              )
              .join('')}
                <li>추가하기</li>
            </ul>
        </div>

        <div class="input-wrapper">
            <label for="type">금액</label>
            <div class="field">
                <input type="checkbox" name="isIncome" id='isIncome' ${
                  history.isIncome ? 'checked' : ''
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
  }
}
