import { doc } from 'prettier';
import './InputForm.scss';

export class InputForm {
  constructor($target) {
    this.$target = $target;
    this.$inpufForm = document.createElement('form');
    this.$inpufForm.className = 'inputForm';

    this.$target.appendChild(this.$inpufForm);
    this.category = [
      {
        id: 1,
        content: '월급',
        isIncome: true,
      },
      {
        id: 2,
        content: '용돈',
        isIncome: true,
      },
      {
        id: 3,
        content: '식비',
        isIncome: false,
      },
      {
        id: 4,
        content: '생활',
        isIncome: false,
      },
      {
        id: 5,
        content: '교통',
        isIncome: false,
      },
      {
        id: 6,
        content: '여가',
        isIncome: false,
      },
    ];
    this.render();
    this.init();
  }

  init() {
    const $isIncome = document.querySelector('#isIncome');
    $isIncome.addEventListener('change', () => {
      const $dropdown = document.querySelector('.dropdown');

      const $inputType = document.querySelector('input[name="type"]');
      $inputType.value = '';
      $inputType.dataset.id = '';

      $dropdown.innerHTML = this.category
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

    const $category = document.querySelector('.inputForm .category');
    $category.addEventListener('click', (event) => {
      const $li = event.target.closest('li');
      if (!$li) return;

      const $inputType = document.querySelector('input[name="type"]');
      $inputType.value = $li.innerHTML;
      $inputType.dataset.id = $li.dataset.id;

      $category.style.display = 'none';
    });

    const $payment = document.querySelector('.inputForm .payment');
    $payment.addEventListener('click', (event) => {
      const $li = event.target.closest('li');
      if (!$li) return;

      const $inputType = document.querySelector('input[name="payment"]');

      if (!$li.dataset.name) {
        // 추가하기 버튼
        return;
      }
      $inputType.value = $li.dataset.name;
      $inputType.dataset.id = $li.dataset.id;

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
    this.$inpufForm.innerHTML = `
    
    <div class="inputs-wrapper">
        <div class="input-wrapper">
            <label for="date">일자</label>
            <input type="date" name="일자" value="${this.initDate()}"/>
        </div>

        <div class="input-wrapper">
            <label for="type">분류</label>
            <div class="field">
                <input type="text" name="type" placeholder="선택하세요" readonly/>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6.5L8 10.5L12 6.5" stroke="#8D9393" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>

            <ul class="category dropdown">
            ${this.category
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
            <input type="text" name="title" placeholder="입력하세요" maxlength="20"/>
        </div>

        <div class="input-wrapper">
            <label for="type">결제수단</label>
            <div class="field">
                <input type="text" name="payment" placeholder="선택하세요" readonly/>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6.5L8 10.5L12 6.5" stroke="#8D9393" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <ul class="payment dropdown">
                <li data-name="menu1">menu <button>X</button></li>
                <div class="border"></div>
                <li data-name="menu2">menu <button>X</button></li>
                <div class="border"></div>
                <li><button>추가하기</button></li>
            </ul>
        </div>

        <div class="input-wrapper">
            <label for="type">금액</label>
            <div class="field">
                <input type="checkbox" name="isIncome" id='isIncome' checked></input>
                <label for='isIncome'></label>
                <input type="text" name="amount" placeholder="입력하세요" autocomplete="off"/>원
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

  sendNotify() {}
}
