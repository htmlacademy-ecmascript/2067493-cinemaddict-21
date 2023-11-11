import Filter from '../view/filter.js';
import { render, RenderPosition } from '../framework/render.js';

export default class FilterPresenter {
  #filters = null;
  #filterContainer = null;

  constructor ({filters, container}) {
    this.#filters = filters;
    this.#filterContainer = container;
  }

  init() {
    render(new Filter({filters: this.#filters}), this.#filterContainer, RenderPosition.AFTERBEGIN);
  }
}
