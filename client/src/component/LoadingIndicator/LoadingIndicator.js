import PresentImage from '../../../public/image/present.png';
import PointImage from '../../../public/image/point.png';
// import BaedalImage from '../../../public/image/hyeondoonge.jpeg';
import SproudImage from '../../../public/image/sproud.png';
import HeartImage from '../../../public/image/heart.png';
import './LoadingIndicator.scss';
import { getState, subscribeState } from '../../store';
import { storeKeys } from '../../utils/constant';

export class LoadingIndicator {
  constructor($target) {
    this.$target = $target;
    this.images = [PresentImage, PointImage, SproudImage, HeartImage];
    this.$loading = document.createElement('div');
    this.$loading.className = 'loading';
    this.$target.appendChild(this.$loading);
    this.render();
    this.setImageSrcPreiodically();
    this.unsubscribeIsLoading = subscribeState({
      key: storeKeys.ISLOADING,
      callback: () => this.render(),
    });
  }

  setImageSrcPreiodically() {
    let idx = 0;
    this.interval = setInterval(() => {
      const $img = this.$loading.querySelector('img');
      idx++;
      if (idx > 3) idx = 0;
      $img.src = this.images[idx];
    }, 500);
  }

  render() {
    const isLoading = getState({ key: storeKeys.ISLOADING });
    if (!isLoading) clearInterval(this.interval);

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
