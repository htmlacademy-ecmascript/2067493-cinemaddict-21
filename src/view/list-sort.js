import AbstractView from '../framework/view/abstract-view.js';
import { createListSortTemplate } from './view-template/list-sort-template.js';
const classActive = 'sort__button--active';
export default class ListSort extends AbstractView {
  #handleChangeSort = null;

  constructor ({onChangeSort}) {
    super();
    this.#handleChangeSort = onChangeSort;

    this.element.addEventListener('click', this.#sortChangeHandler);
  }

  get template () {
    return createListSortTemplate();
  }

  #sortChangeHandler = (evt) => {
    if(evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    this.element.querySelector('.sort__button--active')
      .classList.remove(classActive);
    evt.target.classList.add(classActive);

    this.#handleChangeSort(evt.target.dataset.sortType);
  };
}
