import './InputForm.scss';

export class InputForm {
  constructor($target) {
    this.$target = $target;
    this.$inpufForm = document.createElement('form');
    this.$inpufForm.className = 'inputForm';

    this.$target.appendChild(this.$inpufForm);
    this.render();
  }

  init() {}

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

            <ul class="dropdown">
                <li>menu</li>
                <div class="border"></div>
                <li>menu</li>
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
            <ul class="dropdown">
                <li>menu <button>X</button></li>
                <div class="border"></div>
                <li>menu <button>X</button></li>
                <div class="border"></div>
                <li><button>추가하기</button></li>
            </ul>
        </div>

        <div class="input-wrapper">
            <label for="type">금액</label>
            <div class="field">
                <input type="text" name="isIncome" value="+" readonly></input>
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
