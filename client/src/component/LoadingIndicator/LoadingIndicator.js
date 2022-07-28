import PresentImage from '../../../public/image/present.png';
import PointImage from '../../../public/image/point.png';
// import BaedalImage from '../../../public/image/hyeondoonge.jpeg';
import SproudImage from '../../../public/image/sproud.png';
import HeartImage from '../../../public/image/heart.png';
import './LoadingIndicator.scss';

export class LoadingIndicator {
  constructor($target) {
    this.$target = $target;
    this.images = [PresentImage, PointImage, SproudImage, HeartImage];
    this.$loading = document.createElement('div');
    this.$loading.className = 'loading';
    this.render();
    this.setImageSrcPreiodically();
  }

  setImageSrcPreiodically() {
    let idx = 0;
    setInterval(() => {
      const $img = this.$loading.querySelector('img');
      idx++;
      if (idx > 3) idx = 0;
      $img.src = this.images[idx];
    }, 700);
  }

  render() {
    this.$target.appendChild(this.$loading);

    this.$loading.innerHTML = `
        <div class="background">
        <img src=${this.images[0]} style="object-fit: scale-down">
        </div>
        <div>
        <strong>
        데이터를 불러오고 있습니다.<strong>
        </div>
    `;
  }
}
