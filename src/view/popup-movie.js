import AbstractView from '../framework/view/abstract-view.js';
import { createPopupTemplate } from './view-template/popup/popup-template.js';

export default class PopupMovie extends AbstractView {
  #movie = {};
  #comments = [];
  #handleClosePopup = null;

  constructor ({movie, comments, oneClickClosePopup}) {
    super();
    this.#movie = movie;
    this.#comments = comments;

    this.#handleClosePopup = oneClickClosePopup;

    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closePopupHandler);
  }

  #closePopupHandler = (evt) => {
    evt.preventDefault();
    this.#handleClosePopup();
  };

  get template () {
    return createPopupTemplate({movie: this.#movie, comments: this.#comments});
  }
}
