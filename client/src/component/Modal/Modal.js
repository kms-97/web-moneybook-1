import Component from '../../core/Component';
import './Modal.scss';

export class Modal extends Component {
  constructor(props) {
    super(document.querySelector('#root'), 'div', { class: 'modal' }, props);
  }

  attachEvents() {
    this.$self.addEventListener('click', (e) => {
      this.dispatchOnClickProps(e);
    });

    this.$self.addEventListener('input', (event) => {
      const $input = this.$self.querySelector('input');
      $input.value = event.target.value;
    });

    this.$self.addEventListener('click', (event) =>
      this.onClickCancelButton(event),
    );
  }

  dispatchOnClickProps(e) {
    const $customButton = e.target.closest('.custom-button');
    if (!$customButton) return;

    if (!this.props.button.onClick) return;
    const $input = this.$self.querySelector('input');
    this.props.button.onClick($input.value);
    this.closeModal();
  }

  onClickCancelButton(event) {
    const $cancelButton = event.target.closest('.cancel-button');
    if (!$cancelButton) return;
    this.closeModal();
  }

  closeModal() {
    this.$self.remove();
  }

  render({ input, description, button }) {
    this.$self.innerHTML = `
      <div class="input-wrapper">
        <span class="description">${description ?? ''}</span>
        <input type="text" placeholder=${input?.placeholder ?? ''}
        ${input?.readonly ? 'readonly' : ''}
        autocomplete="off" value=${input?.value ?? ''}>
        <div class="button-wrapper">
          <button class="cancel-button">취소</button>
          <button class="custom-button" style="color:${
            button?.color ?? 'default'
          }">${button?.name ?? ''}</button>
        </div>
      </div>`;
  }
}
