import './Error.scss';
import { Router } from '../../router/Router';
import Component from '../../core/Component';

export class Error extends Component {
  constructor($parent, code, message) {
    super($parent, 'div', { class: 'error' }, { code, message });
    this.code = code;
    this.message = message;

    this.router = Router.getInstance();
  }

  attachEvents() {
    this.$self.addEventListener('click', (e) => {
      this.routing(e);
    });
  }

  routing(e) {
    const $button = e.target.closest('button');
    if (!$button) return;

    this.router.push('/');
  }

  render({ code, message }) {
    this.$self.innerHTML = `
        <div class='code'>${code}</div>
        <div class='message'>${message}</div>
        <button class='escape'>메인 페이지로</button>
    `;
  }
}
