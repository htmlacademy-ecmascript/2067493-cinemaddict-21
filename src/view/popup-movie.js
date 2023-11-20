import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createPopupTemplate } from './view-template/popup/popup-template.js';

export default class PopupMovie extends AbstractStatefulView {
  #handleClosePopup = null;
  #handleClickAlreadyWatched = null;
  #handleClickFavorite = null;
  #handleClickWatchlist = null;

  constructor ({movie, comments, onClickClosePopup, onAlreadyWatched, onFavoriteClick, onWatchlistClick}) {
    super();
    this._setState(PopupMovie.parseMovieToState(movie, comments));

    this.#handleClosePopup = onClickClosePopup;
    this.#handleClickAlreadyWatched = onAlreadyWatched;
    this.#handleClickFavorite = onFavoriteClick;
    this.#handleClickWatchlist = onWatchlistClick;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closePopupHandler);
    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#clickAlreadyWatchedHandler);
    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#clickFavoriteHandler);
    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#clickWatchlistHandler);
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('change', this.#changeEmojiHandler);
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

  #changeEmojiHandler = (evt) => {
    const prevScroll = this.element.scrollTop;
    evt.preventDefault();
    this.updateElement({
      userEmoji: evt.target.value
    });
    this.element.scrollTo(0, prevScroll);
  };

  get template () {
    return createPopupTemplate({movie: this._state});
  }

  static parseMovieToState(movie, comments) {
    return {
      ...movie,
      userEmoji: '',
      userTextComment: '',
      comments: [...comments]
    };
  }
}
