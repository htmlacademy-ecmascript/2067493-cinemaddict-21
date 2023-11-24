import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createPopupTemplate } from './view-template/popup/popup-template.js';

export default class PopupMovie extends AbstractStatefulView {
  #handleClosePopup = null;
  #handleClickAlreadyWatched = null;
  #handleClickFavorite = null;
  #handleClickWatchlist = null;
  #handleClickDeleteComment = null;
  #handleKeyDownAddComment = null;

  constructor({ movie, comments, onClickClosePopup, onAlreadyWatched, onFavoriteClick, onWatchlistClick, onClickDeleteComment, onKeyDownAddComment }) {
    super();
    this._setState(PopupMovie.parseMovieToState(movie, comments));

    this.#handleClosePopup = onClickClosePopup;
    this.#handleClickAlreadyWatched = onAlreadyWatched;
    this.#handleClickFavorite = onFavoriteClick;
    this.#handleClickWatchlist = onWatchlistClick;
    this.#handleClickDeleteComment = onClickDeleteComment;
    this.#handleKeyDownAddComment = onKeyDownAddComment;

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
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#inputTextCommentHandler);
    this.element.querySelector('.film-details__comments-list')
      .addEventListener('click', this.#clickDeleteCommentHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('keydown', this.#addCommentKeyDownHandler);
  }

  #addCommentKeyDownHandler = (evt) => {
    if (evt.code === 'Enter' && (evt.ctrlKey || evt.metaKey)) {
      if (this._state.userTextComment !== '' && this._state.userEmoji !== '') {
        evt.preventDefault();
        this.#handleKeyDownAddComment(PopupMovie.parseStateToNewComment(this._state));
      }
    }
  };

  #clickDeleteCommentHandler = (evt) => {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }

    const movie = PopupMovie.parseStateToMovie(this._state);
    const commentId = movie.comments.find((comment) => comment === evt.target.dataset.commentIdValue);
    const commentDelete = {
      movie,
      comment: commentId
    };

    this.#handleClickDeleteComment(commentDelete);
  };

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

  #inputTextCommentHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      userTextComment: evt.target.value
    });
  };

  get template() {
    return createPopupTemplate({ movie: this._state });
  }


  static parseMovieToState(movie, comments) {
    return {
      ...movie,
      userEmoji: '',
      userTextComment: '',
      comments: [...comments]
    };
  }

  static parseStateToMovie(state) {
    const movie = { ...state };

    movie.comments = movie.comments.map((comment) => comment.id);

    delete movie.userEmoji;
    delete movie.userTextComment;

    return movie;
  }

  static parseStateToNewComment(state) {
    const comment = {
      id: state.id,
      comment: {
        comment: state.userTextComment,
        emotion: state.userEmoji,
      }
    };

    return comment;
  }
}
