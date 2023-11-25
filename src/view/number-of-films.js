import AbstractView from '../framework/view/abstract-view.js';

function createNumberOfFilmsTemplate(movieCount) {
  return `
    <p>${movieCount} movies inside</p>
  `;
}

export default class NumberOfFilms extends AbstractView {
  #moviesCount = null;
  constructor(movieCount){
    super();
    this.#moviesCount = movieCount;
  }

  get template() {
    return createNumberOfFilmsTemplate(this.#moviesCount);
  }
}
