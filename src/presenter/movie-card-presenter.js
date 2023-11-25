import PopupContainer from '../view/popup-container.js';
import PopupMovie from '../view/popup-movie.js';
import MovieCard from '../view/movie-card.js';
import { UserAction, UpdateType } from '../const.js';
import { render, remove, replace } from '../framework/render.js';
import { shake } from '../utils.js';

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
      await this.renderPopupMovie(this.#movie);
    }
  }

  resetView() {
    if (this.#mode !== Mode.CARD) {
      this.#removePopupMovie();
    }
  }

  destroy() {
    remove(this.#movieCard);
    this.#removePopupMovie();
  }

  setErrorUpdate() {
    if (this.#mode === Mode.CARD) {
      this.#movieCard.updateElement({
        isDisable: false,
      });
      this.#movieCard.shake();
      return;
    }

    this.#popupMovie.updateElement({
      isDisable: false,
    });
    const element = this.#popupMovie.element.querySelector('.film-details__controls');
    shake(element);
  }

  setErrorAddComment() {
    this.#popupMovie.updateElement({
      isDisable: false,
    });
    const element = this.#popupMovie.element.querySelector('.film-details__new-comment');
    shake(element);
  }

  setErrorDeleteComment(commentId) {
    this.#popupMovie.updateElement({
      isDisable: false,
      isDeleting: false,
    });
    const element = this.#popupMovie.element.querySelector(`#${commentId}`);
    shake(element);
  }

  setDisable() {
    this.#movieCard.updateElement({
      isDisable: true,
    });
    if (this.#mode === Mode.POPUP) {
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

  async renderPopupMovie(movie) {
    const comments = await this.#moviesModel.getComments(movie.id);
    const prevPopupMovie = this.#popupMovie;
    this.#popupMovie = new PopupMovie({
      movie: movie,
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
    await this.renderPopupMovie(this.#movie);
  };

  #handleClosePopupClick = () => {
    this.#removePopupMovie();
  };

  #handlerChangeWatchlist = () => {
    this.#handleDataChange(
      UserAction.UPDATE,
      UpdateType.MINOR,
      {
        movie: {
          ...this.#movie, userDetails: {
            ...this.#movie.userDetails,
            watchlist: !this.#movie.userDetails.watchlist
          }
        },
        mode: this.#mode
      });
  };

  #handlerChangeFavorite = () => {
    this.#handleDataChange(
      UserAction.UPDATE,
      UpdateType.MINOR,
      {
        movie: {
          ...this.#movie, userDetails: {
            ...this.#movie.userDetails,
            favorite: !this.#movie.userDetails.favorite
          }
        },
        mode: this.#mode
      });
  };

  #handlerChangeAlreadyWatched = () => {
    this.#handleDataChange(
      UserAction.UPDATE,
      UpdateType.MINOR,
      { movie: {
        ...this.#movie, userDetails: {
          ...this.#movie.userDetails,
          alreadyWatched: !this.#movie.userDetails.alreadyWatched,
          watchingDate: this.#movie.userDetails.watchingDate === null
            ? this.#movie.userDetails.watchingDate = new Date()
            : this.#movie.userDetails.watchingDat = null
        }
      },
      mode: this.#mode
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
