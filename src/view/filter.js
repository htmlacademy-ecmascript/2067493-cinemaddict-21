import AbstractView from '../framework/view/abstract-view.js';
import { createFilterTemplate } from './view-template/filter-template.js';

export default class Filter extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #handleChangeFilter = null;

  constructor({filters, currentFilterType, onChangeFilter}) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleChangeFilter = onChangeFilter;

    this.element.addEventListener('click', this.#changeFilterhandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  #changeFilterhandler = (evt) => {
    if (evt.target.tagName === 'A' || evt.target.tagName === 'SPAN'){
      evt.preventDefault();
      this.#handleChangeFilter(evt.target.dataset.filterType);
    }
  };
}
