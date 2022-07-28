import './Modal.scss';

export class Modal {
  constructor(props) {
    this.$target = document.querySelector('#root');
    this.props = props;
    this.$modal = document.createElement('div');
    this.$modal.className = 'modal';

    this.$target.appendChild(this.$modal);
    this.render();
    this.init();
  }

  init() {
    // 색상 입히기
    const $customButton = this.$modal.querySelector('.custom-button');
    $customButton.style.color = this.props?.button?.color ?? 'default';

    // 이벤트 등록하기
    this.$modal.addEventListener('click', (event) => {
      const $customButton = event.target.closest('.custom-button');
      if (!$customButton) return;

      if (!this.props.button.onClick) return;
      const $input = this.$modal.querySelector('input');
      this.props.button.onClick($input.value);
      this.closeModal();
    });

    this.$modal.addEventListener('input', (event) => {
      const $input = this.$modal.querySelector('input');
      $input.value = event.target.value;
    });
    this.$modal.addEventListener('click', (event) =>
      this.onClickCancelButton(event),
    );
  }

  onClickCancelButton(event) {
    const $cancelButton = event.target.closest('.cancel-button');
    if (!$cancelButton) return;
    this.closeModal();
  }

  closeModal() {
    this.$modal.remove();
  }

  render() {
    this.$modal.innerHTML = `
      <div class="input-wrapper">
        <span class="description">${this.props.description ?? ''}</span>
        <input type="text" placeholder=${this.props.input?.placeholder ?? ''}
        ${this.props.input?.readonly ? 'readonly' : ''}
        autocomplete="off" value=${this.props.input?.value ?? ''}>
        <div class="button-wrapper">
          <button class="cancel-button">취소</button>
          <button class="custom-button">${
            this.props.button?.name ?? ''
          }</button>
        </div>
      </div>`;
  }
}
