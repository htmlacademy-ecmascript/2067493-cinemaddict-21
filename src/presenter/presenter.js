import InfoUser from '../view/info-user.js';
import ListSort from '../view/list-sort.js';
import ContainerMovies from '../view/container-movies.js';
import MoviesList from '../view/movies-list.js';
import NumberOfFilms from '../view/number-of-films.js';
import ShowMoreButton from '../view/show-more-button.js';
import MovieCardPresenter from './movie-card-presenter.js';
import Empty from '../view/empty.js';
import { updateItem } from '../utils.js';
import { render, remove } from '../framework/render.js';
import { SORT_TYPE } from '../const.js';

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
  #sortMoviesDefault = [];
  #movies = [];
  #comments = [];
  #renderedMoviesCount = MOVIES_COUNT_PER_STEP;
  #currentSortType = SORT_TYPE.DEFAULT;

  constructor({ containerInfoUser, contentContainer, containerNumberOfFilms, moviesModel, comments, body }) {
    this.#containerInfoUser = containerInfoUser;
    this.#contentContainer = contentContainer;
    this.#containerNumberOfFilms = containerNumberOfFilms;
    this.#movies = [...moviesModel];
    this.#sortMoviesDefault = [...this.#movies];
    this.#comments = comments;
    this.#bodyContainer = body;
  }

  init() {
    this.#renderInfoUser();
    this.#renderListSort();
    this.#renderContainerMovies();
    this.#renderListMovies();
    this.#renderNumberOfFilms();
  }

  #renderInfoUser() {
    render(this.#infoUser, this.#containerInfoUser);
  }

  #handleChangeSort = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }


    switch (sortType) {
      case SORT_TYPE.DATE:
        this.#movies.sort((a, b) => b.filmInfo.releas.date - a.filmInfo.releas.date);
        break;
      case SORT_TYPE.RETING:
        this.#movies.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        break;
      default:
        this.#movies = [...this.#sortMoviesDefault];
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
    if (this.#movies.length === 0) {
      this.#renderEmpty();
      return;
    }
    render(this.#moviesList, this.#containerMovies.element);
    this.#renderCards();
    this.#renderShowMoreButton();
  }

  #renderCards = () => {
    this.#movies
      .slice(0, Math.min(this.#movies.length, this.#renderedMoviesCount))
      .forEach((movie) => this.#renderCardMovie(movie));
  };

  #renderCardMovie(movie) {
    const movieCard = new MovieCardPresenter({
      containerCards: this.#moviesList.element,
      comments: this.#comments,
      bodyContainer: this.#bodyContainer,
      onDateChange: this.#handlerChangeMovies,
      onModeChange: this.#handleChangeMode
    });
    this.#cardsMoviesPresentrs.set(movie.id, movieCard);
    movieCard.init(movie);
  }

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
    if (this.#movies.length > MOVIES_COUNT_PER_STEP) {
      this.#showMoreButton = new ShowMoreButton({
        onClick: this.#handlerClickShowMoreButton
      });

      render(this.#showMoreButton, this.#containerMovies.element);
    }
  }

  #handlerClickShowMoreButton = () => {
    this.#movies
      .slice(this.#renderedMoviesCount, this.#renderedMoviesCount + MOVIES_COUNT_PER_STEP)
      .forEach((movie) => this.#renderCardMovie(movie));

    this.#renderedMoviesCount += MOVIES_COUNT_PER_STEP;

    if (this.#renderedMoviesCount >= this.#movies.length) {
      remove(this.#showMoreButton);
    }
  };

  #renderNumberOfFilms() {
    render(this.#numberOfFilms, this.#containerNumberOfFilms);
  }

  #handlerChangeMovies = (updateMovie) => {
    this.#movies = updateItem(this.#movies, updateMovie);
    this.#sortMoviesDefault = updateItem(this.#sortMoviesDefault, updateMovie);
    this.#cardsMoviesPresentrs.get(updateMovie.id).init(updateMovie);
  };

}
