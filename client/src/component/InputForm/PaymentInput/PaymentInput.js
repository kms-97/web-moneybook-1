import { paymentStore, selectedHistoryStore } from '../../../store/store';

export default class PaymentInput {
  constructor($target) {
    this.$target = $target; // $inputForm
    this.$paymentInput = document.createElement('div');

    paymentStore.subscribe(() => this.render());

    this.$target.appendChild(this.$paymentInput);
    this.render();
    this.init();
  }

  init() {}

  render() {
    const history = selectedHistoryStore.get();
    const payment = paymentStore.get();

    this.$paymentInput.innerHTML = `
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
  `;
  }
}
