import PopupContainer from '../view/popup-container.js';
import PopupMovie from '../view/popup-movie.js';
import MovieCard from '../view/movie-card.js';
import { UserAction, UpdateType } from '../const.js';
import { render, remove, replace } from '../framework/render.js';

const Mode = {
  CARD: 'CARD',
  POPUP: 'POPUP'
};
export default class MovieCardPresenter {
  #popupContainer = new PopupContainer();
  #bodyContainer = null;
  #containerCards = null;

  #movieCard = null;
  #popupMovie = null;

  #moviesModel = null;
  #movie = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.CARD;

  constructor({ containerCards, moviesModel, bodyContainer, onDateChange, onModeChange }) {
    this.#containerCards = containerCards.querySelector('.films-list__container');
    this.#moviesModel = moviesModel;
    this.#bodyContainer = bodyContainer;
    this.#handleDataChange = onDateChange;
    this.#handleModeChange = onModeChange;
  }

  async init(movie) {
    this.#movie = movie;
    const prevCardMovie = this.#movieCard;

    this.#movieCard = new MovieCard({
      movie: this.#movie,
      onPopupClick: this.#handlePopupClick,
      onWatchlistClick: this.#handlerChangeWatchlist,
      onFavoriteClick: this.#handlerChangeFavorite,
      onAlreadyWatched: this.#handlerChangeAlreadyWatched,
    });

    if (prevCardMovie === null) {
      render(this.#movieCard, this.#containerCards);
      return;
    }

    replace(this.#movieCard, prevCardMovie);

    if (this.#mode === Mode.POPUP) {
      await this.#renderPopupMovie();
    }
  }

  resetView() {
    if (this.#mode !== Mode.CARD) {
      this.#removePopupMovie();
    }
  }

  destroy() {
    remove(this.#movieCard);
    remove(this.#popupMovie);
  }

  setDisable() {
    this.#movieCard.updateElement({
      isDisable: true,
    });
    if(this.#mode === Mode.POPUP) {
      this.#popupMovie.updateElement({
        isDisable: true,
      });
    }
  }

  setDeleting() {
    this.#popupMovie.updateElement({
      isDisable: true,
      isDeleting: true,
    });
    this.#movieCard.updateElement({
      isDisable: true,
    });
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

  async #renderPopupMovie() {
    const comments = await this.#moviesModel.getComments(this.#movie.id);
    const prevPopupMovie = this.#popupMovie;
    this.#popupMovie = new PopupMovie({
      movie: this.#movie,
      comments: comments,
      onClickClosePopup: this.#handleClosePopupClick,
      onWatchlistClick: this.#handlerChangeWatchlist,
      onFavoriteClick: this.#handlerChangeFavorite,
      onAlreadyWatched: this.#handlerChangeAlreadyWatched,
      onClickDeleteComment: this.#handlerDeletedComment,
      onKeyDownAddComment: this.#handelrAddCommentsKeyDown
    });

    if (this.#mode === Mode.POPUP) {
      replace(this.#popupMovie, prevPopupMovie);
      return;
    }

    this.#bodyContainer.classList.add('hide-overflow');
    this.#renderPopupContainer();
    render(this.#popupMovie, this.#popupContainer.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.POPUP;
  }

  #removePopupMovie() {
    this.#bodyContainer.classList.remove('hide-overflow');
    remove(this.#popupContainer);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.CARD;
  }

  #handlePopupClick = async () => {
    if (this.#mode === Mode.POPUP) {
      return;
    }
    await this.#renderPopupMovie();
  };

  #handleClosePopupClick = () => {
    this.#removePopupMovie();
  };

  #handlerChangeWatchlist = () => {
    this.#handleDataChange(
      UserAction.UPDATE,
      UpdateType.MINOR,
      {
        ...this.#movie, userDetails: {
          ...this.#movie.userDetails,
          watchlist: !this.#movie.userDetails.watchlist
        }
      });
  };

  #handlerChangeFavorite = () => {
    this.#handleDataChange(
      UserAction.UPDATE,
      UpdateType.MINOR,
      {
        ...this.#movie, userDetails: {
          ...this.#movie.userDetails,
          favorite: !this.#movie.userDetails.favorite
        }
      });
  };

  #handlerChangeAlreadyWatched = () => {
    this.#handleDataChange(
      UserAction.UPDATE,
      UpdateType.MINOR,
      {
        ...this.#movie, userDetails: {
          ...this.#movie.userDetails,
          alreadyWatched: !this.#movie.userDetails.alreadyWatched,
          watchingDate: this.#movie.userDetails.watchingDate === null
            ? this.#movie.userDetails.watchingDate = new Date()
            : this.#movie.userDetails.watchingDat = null
        }
      });
  };

  #handlerDeletedComment = (comment) => {
    this.#handleDataChange(
      UserAction.DELETE_COMMENT,
      UpdateType.PATH,
      comment
    );
  };

  #handelrAddCommentsKeyDown = (comment) => {
    this.#handleDataChange(
      UserAction.ADD_COMMENT,
      UpdateType.PATH,
      comment,
    );
  };

}
