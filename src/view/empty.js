import { createEmptyTemplate } from './view-template/empty-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class Empty extends AbstractView {
  #typeFilter = null;
  constructor({typeFilter}) {
    super();
    this.#typeFilter = typeFilter;
  }

  get template () {
    return createEmptyTemplate(this.#typeFilter);
  }
}
