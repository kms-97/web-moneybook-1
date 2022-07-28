import { getState } from '../../../controller';
import Component from '../../../core/Component';
import { storeKeys } from '../../../utils/constant';

export default class CategoryInput extends Component {
  constructor($parent) {
    super($parent, 'div');

    this.subscribeState([storeKeys.CATEGORY]);
  }

  attachEvents() {
    this.$self.addEventListener('click', (e) => {
      this.onClickCategoryItem(e);
    });

    this.$self.addEventListener('click', (e) => {
      this.onClickDropdownField(e);
    });
  }

  onClickCategoryItem(event) {
    const $li = event.target.closest('.inputForm .category>li');
    if (!$li) return;

    const $inputType = this.$self.querySelector('input[name="type"]');
    $inputType.value = $li.innerHTML;
    $inputType.dataset.id = $li.dataset.id;

    const $category = this.$self.querySelector('.category');
    $category.style.display = 'none';
  }

  onClickDropdownField(event) {
    const $field = event.target.closest('.field');
    if (!$field) return;

    const $dropdown = $field.nextElementSibling;
    if (!$dropdown || !$dropdown.className.includes('dropdown')) return;

    $dropdown.style.display =
      ($dropdown.style.display === 'none') | ($dropdown.style.display === '')
        ? 'block'
        : 'none';

    if (!$field) return;
    const $categoryDropdown = $field.nextElementSibling.className.includes(
      'category',
    )
      ? $field.nextElementSibling
      : null;
    if (!$categoryDropdown) return;
  }

  render() {
    const history = getState({ key: storeKeys.SELECTED_HISTORY });
    const category = getState({ key: storeKeys.CATEGORY });

    this.$self.innerHTML = `
    <label for="type">분류</label>
    <div class="field">
        <input type="text" name="type" placeholder="선택하세요" value="${
          category.filter(({ id }) => id === history.categoryId)[0]?.content ??
          ''
        }" data-id="${history.categoryId ?? ''}" readonly/>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6.5L8 10.5L12 6.5" stroke="#8D9393" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>

    <ul class="category dropdown">
    ${category
      .filter(({ isIncome }) =>
        history.isIncome !== undefined
          ? history.isIncome === isIncome
          : isIncome === 0,
      )
      .map(
        ({ id, content }) => `
            <li data-id=${id}>${content}</li>
            <div class="border"></div>`,
      )
      .join('')}
    </ul>
  `;
  }
}
