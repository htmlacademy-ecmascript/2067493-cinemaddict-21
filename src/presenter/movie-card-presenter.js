import PopupContainer from '../view/popup-container.js';
import PopupMovie from '../view/popup-movie.js';
import MovieCard from '../view/movie-card.js';
import { render, remove, replace } from '../framework/render.js';

export default class MovieCardPresenter {
  #popupContainer = new PopupContainer();
  #bodyContainer = null;
  #containerCards = null;

  #movieCard = null;
  #popupMovie = null;

  #comments = [];
  #movie = null;

  #handleDataChange = null;

  constructor({ containerCards, comments, bodyContainer, onDateChange }) {
    this.#containerCards = containerCards.querySelector('.films-list__container');
    this.#comments = comments;
    this.#bodyContainer = bodyContainer;
    this.#handleDataChange = onDateChange;
  }

  init(movie) {
    this.#movie = movie;

    const prevCardMovie = this.#movieCard;
    const prevPopupMovie = this.#popupMovie;

    this.#movieCard = new MovieCard({
      movie: this.#movie,
      onPopupClick: this.#handlePopupClick,
      onWatchlistClick: this.#handlerChangeWatchlist,
      onFavoriteClick: this.#handlerChangeFavorite,
      onAlreadyWatched: this.#handlerChangeAlreadyWatched,
    });

    this.#popupMovie = new PopupMovie({
      movie: this.#movie,
      comments: this.#comments,
      onClickClosePopup: this.#handleClosePopupClick,
      onWatchlistClick: this.#handlerChangeWatchlist,
      onFavoriteClick: this.#handlerChangeFavorite,
      onAlreadyWatched: this.#handlerChangeAlreadyWatched,
    });


    if (prevCardMovie === null && prevPopupMovie === null) {
      render(this.#movieCard, this.#containerCards);
      return;
    }

    if (this.#containerCards.contains(prevCardMovie.element)) {
      replace(this.#movieCard, prevCardMovie);
    }

    if (document.contains(this.#popupContainer.element)) {
      if(this.#popupContainer.element.contains(prevPopupMovie.element)) {
        replace(this.#popupMovie, prevPopupMovie);
      }
    }

    remove(prevCardMovie);
    remove(prevPopupMovie);
  }

  destroy() {
    remove(this.#movieCard);
    remove(this.#popupMovie);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#removePopupMovie();
    }
  };

  #renderPopupContainer() {
    render(this.#popupContainer, this.#bodyContainer);
  }

  #renderPopupMovie() {
    this.#bodyContainer.classList.add('hide-overflow');
    this.#renderPopupContainer();
    render(this.#popupMovie, this.#popupContainer.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #removePopupMovie() {
    this.#bodyContainer.classList.remove('hide-overflow');
    remove(this.#popupContainer);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handlePopupClick = () => {
    this.#renderPopupMovie();
  };

  #handleClosePopupClick = () => {
    this.#removePopupMovie();
  };

  #handlerChangeWatchlist = () => {
    this.#handleDataChange({ ...this.#movie, userDetails: {
      ...this.#movie.userDetails,
      watchlist: !this.#movie.userDetails.watchlist }});
  };

  #handlerChangeFavorite = () => {
    this.#handleDataChange({ ...this.#movie, userDetails: {
      ...this.#movie.userDetails,
      favorite: !this.#movie.userDetails.favorite } });
  };

  #handlerChangeAlreadyWatched = () => {
    this.#handleDataChange({
      ...this.#movie, userDetails: {
        ...this.#movie.userDetails,
        alreadyWatched: !this.#movie.userDetails.alreadyWatched,
        watchingDate: this.#movie.userDetails.watchingDate === null
          ? this.#movie.userDetails.watchingDate = new Date()
          : this.#movie.userDetails.watchingDat = null
      }
    });
  };

}
