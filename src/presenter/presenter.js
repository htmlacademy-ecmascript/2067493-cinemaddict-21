import InfoUser from '../view/info-user.js';
import ListSort from '../view/list-sort.js';
import Loading from '../view/loading.js';
import ContainerMovies from '../view/container-movies.js';
import MoviesList from '../view/movies-list.js';
import NumberOfFilms from '../view/number-of-films.js';
import ShowMoreButton from '../view/show-more-button.js';
import MovieCardPresenter from './movie-card-presenter.js';
import Empty from '../view/empty.js';
import { diffDate, filters } from '../utils.js';
import { render, remove} from '../framework/render.js';
import { SORT_TYPE, UserAction, UpdateType ,FILTER_TYPE } from '../const.js';

const MOVIES_COUNT_PER_STEP = 5;

export default class Presenter {
  #containerMovies = new ContainerMovies();
  #moviesList = new MoviesList();
  #numberOfFilms = null;
  #infoUser = null;
  #empty = null;
  #cardsMoviesPresentrs = new Map();
  #filtersModel = null;
  #listSort = null;
  #bodyContainer = null;
  #showMoreButton = null;
  #containerInfoUser = null;
  #contentContainer = null;
  #containerNumberOfFilms = null;
  #moviesModel = null;
  #isLoading = true;
  #renderedMoviesCount = MOVIES_COUNT_PER_STEP;
  #currentSortType = SORT_TYPE.DEFAULT;

  constructor({ containerInfoUser, contentContainer, containerNumberOfFilms, moviesModel, filtersModel, body }) {
    this.#containerInfoUser = containerInfoUser;
    this.#contentContainer = contentContainer;
    this.#containerNumberOfFilms = containerNumberOfFilms;
    this.#moviesModel = moviesModel;
    this.#filtersModel = filtersModel;

    this.#bodyContainer = body;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderInfoUser();
    this.#renderBoard();
    this.#renderNumberOfFilms();
  }

  get movies() {
    const filterType = this.#filtersModel.filter;
    const movies = this.#moviesModel.movies;
    const filteredMovies = filters[filterType](movies);
    switch (this.#currentSortType) {
      case SORT_TYPE.DATE:
        return filteredMovies.sort((a, b) => diffDate(a.filmInfo.release.date, b.filmInfo.release.date));
      case SORT_TYPE.RETING:
        return filteredMovies.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    }

    return filteredMovies;
  }

  #renderInfoUser() {
    const movies = this.#moviesModel.movies;
    const filteredHistoryMoviesCount = filters[FILTER_TYPE.HISTORY](movies).length;
    this.#infoUser = new InfoUser({historyCount: filteredHistoryMoviesCount});
    render(this.#infoUser, this.#containerInfoUser);
  }

  #handleChangeSort = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearMoviesCard({resetRederendCount: true});
    this.#renderContainerMovies();
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
    this.#empty = new Empty({typeFilter: this.#filtersModel.filter});
    render(this.#empty, this.#containerMovies.element);
  }

  #renderBoard () {
    if(this.#isLoading){
      this.#renderContainerMovies();
      render(new Loading(), this.#containerMovies.element);
      return;
    }
    this.#renderListSort();
    this.#renderContainerMovies();
    this.#renderListMovies();
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

    if(this.#renderedMoviesCount < moviesCount) {
      this.#renderShowMoreButton();
    }
  }

  #renderCards = (movies) => {
    movies.forEach(this.#renderCardMovie);
  };

  #renderCardMovie = (movie) => {
    const movieCard = new MovieCardPresenter({
      containerCards: this.#moviesList.element,
      moviesModel: this.#moviesModel,
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

  #clearMoviesCard({resetSortType = false, resetRederendCount = false} = {}) {
    const moviesCount = this.movies.length;
    this.#cardsMoviesPresentrs.forEach((presenter) => presenter.destroy());
    this.#cardsMoviesPresentrs.clear();

    if(resetSortType) {
      remove(this.#listSort);
      this.#currentSortType = SORT_TYPE.DEFAULT;
    }

    if(resetRederendCount){
      this.#renderedMoviesCount = MOVIES_COUNT_PER_STEP;
    } else {
      this.#renderedMoviesCount = Math.min(moviesCount, this.#renderedMoviesCount);
    }

    remove(this.#containerMovies);
    remove(this.#empty);
    remove(this.#moviesList);
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
    const moviesCount = this.#moviesModel.movies.length;
    this.#numberOfFilms = new NumberOfFilms(moviesCount);
    render(this.#numberOfFilms, this.#containerNumberOfFilms);
  }

  #handleViewAction = async (actionUser, updateType, update) => {
    switch(actionUser){
      case UserAction.UPDATE:
        try{
          this.#cardsMoviesPresentrs.get(update.id).setDisable();
          this.#moviesModel.updateMovie(updateType, update);
        } catch {
          console.log('ошибка');
        }
        break;
      case UserAction.ADD_COMMENT:
        try {
          this.#cardsMoviesPresentrs.get(update.id).setDisable();
          this.#moviesModel.addComment(updateType, update);
        } catch {
          console.log('ошибка');
        }
        break;
      case UserAction.DELETE_COMMENT:
        try{
          this.#cardsMoviesPresentrs.get(update.movie.id).setDeleting();
          this.#moviesModel.deleteComments(updateType, update, actionUser);
        } catch {
          console.log('ошибка');
        }
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATH:
        this.#cardsMoviesPresentrs.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearMoviesCard();
        remove(this.#infoUser);
        this.#renderInfoUser();
        this.#renderContainerMovies();
        this.#renderListMovies();
        break;
      case UpdateType.MAJOR:
        this.#clearMoviesCard({resetSortType: true, resetRederendCount: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#infoUser);
        remove(this.#numberOfFilms);
        this.#clearMoviesCard({resetSortType: true, resetRederendCount: true});
        this.#renderInfoUser();
        this.#renderBoard();
        this.#renderNumberOfFilms();
    }
  };
}
