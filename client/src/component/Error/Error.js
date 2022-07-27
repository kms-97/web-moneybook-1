import './Error.scss';
import { Router } from '../../router/Router';

export class Error {
  constructor($target, code, message) {
    this.$target = $target;
    this.code = code;
    this.message = message;
    this.$error = document.createElement('div');
    this.$error.className = 'error';

    this.router = Router.getInstance();

    this.$target.appendChild(this.$error);
    this.init();
    this.render();
  }

  init() {
    this.$error.addEventListener('click', this.routing.bind(this));
  }

  routing(e) {
    const $button = e.target.closest('button');
    if (!$button) return;

    this.router.push('/');
  }

  render() {
    this.$error.innerHTML = `
        <div class='code'>${this.code}</div>
        <div class='message'>${this.message}</div>
        <button class='escape'>메인 페이지로</button>
    `;
  }
}
