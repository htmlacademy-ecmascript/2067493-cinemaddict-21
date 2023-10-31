import AbstractView from '../framework/view/abstract-view.js';

function createShowMoreButtonTemplate () {
  return '<button class="films-list__show-more">Show more</button>';
}

export default class ShowMoreButton extends AbstractView {
  #handleClick = null;

  constructor ({onClick}) {
    super();
    this.#handleClick = onClick;

    this.element.addEventListener('click', this.#handlerClick);
  }

  get template () {
    return createShowMoreButtonTemplate();
  }

  #handlerClick = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
