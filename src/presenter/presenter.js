import InfoUser from '../view/info-user.js';
import ListSort from '../view/list-sort.js';
import ContainerMovies from '../view/container-movies.js';
import MoviesList from '../view/movies-list.js';
import NumberOfFilms from '../view/number-of-films.js';
import ShowMoreButton from '../view/show-more-button.js';
import MovieCardPresenter from './movie-card-presenter.js';
import Empty from '../view/empty.js';
import { diffDate } from '../utils.js';
import { render, remove } from '../framework/render.js';
import { SORT_TYPE, UserAction, UpdateType } from '../const.js';

const MOVIES_COUNT_PER_STEP = 5;

export default class Presenter {
  #infoUser = new InfoUser();
  #containerMovies = new ContainerMovies();
  #moviesList = new MoviesList();
  #numberOfFilms = new NumberOfFilms();
  #empty = new Empty();
  #cardsMoviesPresentrs = new Map();
  #listSort = null;
  #bodyContainer = null;
  #showMoreButton = null;
  #containerInfoUser = null;
  #contentContainer = null;
  #containerNumberOfFilms = null;
  #moviesModel = null;
  #comments = null;
  #renderedMoviesCount = MOVIES_COUNT_PER_STEP;
  #currentSortType = SORT_TYPE.DEFAULT;

  constructor({ containerInfoUser, contentContainer, containerNumberOfFilms, moviesModel, body }) {
    this.#containerInfoUser = containerInfoUser;
    this.#contentContainer = contentContainer;
    this.#containerNumberOfFilms = containerNumberOfFilms;
    this.#moviesModel = moviesModel;

    this.#comments = this.#moviesModel.comments;
    this.#bodyContainer = body;

    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderInfoUser();
    this.#renderListSort();
    this.#renderContainerMovies();
    this.#renderListMovies();
    this.#renderNumberOfFilms();
  }

  get movies() {
    switch (this.#currentSortType) {
      case SORT_TYPE.DATE:
        [...this.#moviesModel.movies].sort((a, b) => diffDate(a.filmInfo.releas.date, b.filmInfo.releas.date));
        break;
      case SORT_TYPE.RETING:
        [...this.#moviesModel.movies].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        break;
    }

    return this.#moviesModel.movies;
  }

  get comments() {
    return this.#comments;
  }

  #renderInfoUser() {
    render(this.#infoUser, this.#containerInfoUser);
  }

  #handleChangeSort = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearMoviesCard();
    this.#renderListMovies();
  };

  #renderListSort() {
    this.#listSort = new ListSort({
      onChangeSort: this.#handleChangeSort
    });
    render(this.#listSort, this.#contentContainer);
  }

  #renderContainerMovies() {
    render(this.#containerMovies, this.#contentContainer);
  }

  #renderEmpty() {
    render(this.#empty, this.#containerMovies.element);
  }

  #renderListMovies() {

    const moviesCount = this.movies.length;
    const movies = this.movies.slice(0, Math.min(moviesCount, this.#renderedMoviesCount));

    if (moviesCount === 0) {
      this.#renderEmpty();
      return;
    }

    render(this.#moviesList, this.#containerMovies.element);
    this.#renderCards(movies);
    if(this.#renderedMoviesCount >= moviesCount) {
      this.#renderShowMoreButton();
    }
  }

  #renderCards = (movies) => {
    movies.forEach(this.#renderCardMovie);
  };

  #renderCardMovie = (movie) => {
    const movieCard = new MovieCardPresenter({
      containerCards: this.#moviesList.element,
      comments: this.comments,
      bodyContainer: this.#bodyContainer,
      onDateChange: this.#handleViewAction,
      onModeChange: this.#handleChangeMode
    });
    this.#cardsMoviesPresentrs.set(movie.id, movieCard);
    movieCard.init(movie);
  };

  #handleChangeMode = () => {
    this.#cardsMoviesPresentrs.forEach((presenter) => presenter.resetView());
  };

  #clearMoviesCard() {
    this.#cardsMoviesPresentrs.forEach((presenter) => presenter.destroy());
    this.#cardsMoviesPresentrs.clear();
    this.#renderedMoviesCount = MOVIES_COUNT_PER_STEP;
    remove(this.#showMoreButton);
  }

  #renderShowMoreButton() {
    this.#showMoreButton = new ShowMoreButton({
      onClick: this.#handlerClickShowMoreButton
    });

    render(this.#showMoreButton, this.#containerMovies.element);
  }

  #handlerClickShowMoreButton = () => {
    const moviesCount = this.movies.length;
    const newRenderMoviesCount = Math.min(moviesCount, this.#renderedMoviesCount + MOVIES_COUNT_PER_STEP);
    const movies = this.movies.slice(this.#renderedMoviesCount, newRenderMoviesCount);

    this.#renderCards(movies);
    this.#renderedMoviesCount = newRenderMoviesCount;

    if (this.#renderedMoviesCount >= moviesCount) {
      remove(this.#showMoreButton);
    }
  };

  #renderNumberOfFilms() {
    render(this.#numberOfFilms, this.#containerNumberOfFilms);
  }

  #handleViewAction = (actionUser, updateType, update) => {
    switch(actionUser){
      case UserAction.UPDATE:
        this.#moviesModel.updateMovie(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATH:
        this.#cardsMoviesPresentrs.get(data.id).init(data);
        break;
    }
  };
}
