import {
  categoryStore,
  paymentStore,
  selectedHistoryStore,
} from '../../../store/store';

export default class CategoryInput {
  constructor($target) {
    this.$target = $target; // $inputForm
    this.$categoryInput = document.createElement('div');
    selectedHistoryStore.subscribe(() => this.render());

    this.$target.appendChild(this.$categoryInput);
    this.render();
    this.init();
  }

  init() {
    this.$categoryInput.addEventListener(
      'click',
      this.onClickCategoryItem.bind(this),
    );
    this.$categoryInput.addEventListener(
      'click',
      this.onClickDropdownField.bind(this),
    );
  }

  onClickCategoryItem(event) {
    const $li = event.target.closest('.inputForm .category>li');
    if (!$li) return;

    const $inputType = document.querySelector('input[name="type"]');
    $inputType.value = $li.innerHTML;
    $inputType.dataset.id = $li.dataset.id;

    const $category = document.querySelector('.inputForm .category');
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
    const history = selectedHistoryStore.get();
    const category = categoryStore.get();

    this.$categoryInput.innerHTML = `
    <label for="type">분류</label>
    <div class="field">
        <input type="text" name="type" placeholder="선택하세요" value="${
          category.filter(({ id }) => id === history.categoryId)[0]?.content ??
          ''
        }" date-id="${history.categoryId ?? ''}" readonly/>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6.5L8 10.5L12 6.5" stroke="#8D9393" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>

    <ul class="category dropdown">
    ${categoryStore
      .get()
      .filter(
        ({ isIncome }) =>
          history.isIncome !== undefined
            ? history.isIncome === isIncome
            : isIncome === true, // category 초기값은 수입(+)에 대한 것
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
