import AbstractView from '../framework/view/abstract-view.js';
import { createMovieCardTemplate } from './view-template/movie-card-template.js';

export default class MovieCard extends AbstractView {
  #movie = [];
  #handlePopupClick = null;

  constructor ({movie, onePopupClick}) {
    super();
    this.#movie = movie;
    this.#handlePopupClick = onePopupClick;

    this.element.addEventListener('click', this.#popupClickHandler);
  }

  get template() {
    return createMovieCardTemplate(this.#movie);
  }

  #popupClickHandler = (evt) => {
    evt.preventDefault();

    if(evt.target.type === 'button') {
      return;
    }

    this.#handlePopupClick();
  };

}
