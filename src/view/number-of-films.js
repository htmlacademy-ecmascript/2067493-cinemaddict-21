import AbstractView from '../framework/view/abstract-view.js';

function createNumberOfFilmsTemplate() {
  return `
    <p>130 291 movies inside</p>
  `;
}

export default class NumberOfFilm extends AbstractView {
  get template() {
    return createNumberOfFilmsTemplate();
  }
}
