import AbstractView from '../framework/view/abstract-view.js';
import { createPopupTemplate } from './view-template/popup/popup-template.js';

export default class PopupMovie extends AbstractView {
  #movie = {};
  #comments = [];
  #handleClosePopup = null;
  #handleClickAlreadyWatched = null;
  #handleClickFavorite = null;
  #handleClickWatchlist = null;

  constructor ({movie, comments, onClickClosePopup, onAlreadyWatched, onFavoriteClick, onWatchlistClick}) {
    super();
    this.#movie = movie;
    this.#comments = comments;

    this.#handleClosePopup = onClickClosePopup;
    this.#handleClickAlreadyWatched = onAlreadyWatched;
    this.#handleClickFavorite = onFavoriteClick;
    this.#handleClickWatchlist = onWatchlistClick;

    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closePopupHandler);
    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#clickAlreadyWatchedHandler);
    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#clickFavoriteHandler);
    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#clickWatchlistHandler);
  }

  #closePopupHandler = (evt) => {
    evt.preventDefault();
    this.#handleClosePopup();
  };

  #clickAlreadyWatchedHandler = (evt) => {
    evt.preventDefault();
    this.#handleClickAlreadyWatched();
  };

  #clickFavoriteHandler = (evt) => {
    evt.preventDefault();
    this.#handleClickFavorite();
  };

  #clickWatchlistHandler = (evt) => {
    evt.preventDefault();
    this.#handleClickWatchlist();
  };

  get template () {
    return createPopupTemplate({movie: this.#movie, comments: this.#comments});
  }
}
