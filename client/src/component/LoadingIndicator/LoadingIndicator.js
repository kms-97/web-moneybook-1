import './LoadingIndicator.scss';
import PresentImage from '../../../public/image/present.png';
import PointImage from '../../../public/image/point.png';
import SproudImage from '../../../public/image/sproud.png';
import HeartImage from '../../../public/image/heart.png';
import { storeKeys } from '../../utils/constant';
import { getState } from '../../controller';
import Component from '../../core/Component';

export class LoadingIndicator extends Component {
  constructor($parent) {
    super(
      $parent,
      'div',
      { class: 'loading' },
      { images: [PresentImage, PointImage, SproudImage, HeartImage] },
    );

    this.subscribeState([storeKeys.ISLOADING]);
    this.setImageSrcPreiodically(this.props);
  }

  setImageSrcPreiodically({ images }) {
    let idx = 0;
    this.interval = setInterval(() => {
      const $img = this.$self.querySelector('img');
      idx++;
      if (idx > 3) idx = 0;
      $img.src = images[idx];
    }, 500);
  }

  render({ images }) {
    const isLoading = getState({ key: storeKeys.ISLOADING });
    if (!isLoading) clearInterval(this.interval);

    this.$self.innerHTML = `
        <div class="background">
        <img src=${images[0]} style="object-fit: scale-down">
        </div>
        <div>
        <strong>
        데이터를 불러오고 있습니다.<strong>
        </div>
    `;
  }
}
