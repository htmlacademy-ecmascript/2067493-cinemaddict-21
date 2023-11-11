import AbstractView from '../framework/view/abstract-view.js';
import { createFilterTemplate } from './view-template/filter-template.js';

export default class Filter extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
