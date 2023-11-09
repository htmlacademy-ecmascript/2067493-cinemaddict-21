import InfoUser from '../view/info-user.js';
import Filter from '../view/filter.js';
import ListSort from '../view/list-sort.js';
import ContainerMovies from '../view/container-movies.js';
import MoviesList from '../view/movies-list.js';
import NumberOfFilms from '../view/number-of-films.js';
import ShowMoreButton from '../view/show-more-button.js';
import MovieCardPresenter from './movie-card-presenter.js';
import { render, remove } from '../framework/render.js';

const MOVIES_COUNT_PER_STEP = 5;

const CLASS_EXTRA = {
  RATING: 'extra--rating',
  COMMENT: 'extra--comment'
};
export default class Presenter {
  #infoUser = new InfoUser();
  #filter = new Filter();
  #listSort = new ListSort();
  #containerMovies = new ContainerMovies();
  #moviesList = new MoviesList();
  #numberOfFilms = new NumberOfFilms();
  #bodyContainer = null;
  #showMoreButton = null;
  #containerInfoUser = null;
  #contentContainer = null;
  #containerNumberOfFilms = null;
  #movies = [];
  #comments = [];
  #renderedMoviesCount = MOVIES_COUNT_PER_STEP;

  constructor({ containerInfoUser, contentContainer, containerNumberOfFilms, moviesModel, comments, body }) {
    this.#containerInfoUser = containerInfoUser;
    this.#contentContainer = contentContainer;
    this.#containerNumberOfFilms = containerNumberOfFilms;
    this.#movies = [...moviesModel];
    this.#comments = comments;
    this.#bodyContainer = body;
  }

  init() {
    this.#renderInfoUser();
    this.#renderFilter();
    this.#renderListSort();
    this.#renderContainerMovies();
    this.#renderListMovies();
    this.#renderCards({ container: this.#moviesList.element });
    this.#renderShowMoreButton();
    this.#renderListMoviesExtra(CLASS_EXTRA.RATING);
    this.#renderListMoviesExtra(CLASS_EXTRA.COMMENT);
    this.#renderNumberOfFilms();
  }

  #renderInfoUser() {
    render(this.#infoUser, this.#containerInfoUser);
  }

  #renderFilter() {
    render(this.#filter, this.#contentContainer);
  }

  #renderListSort() {
    render(this.#listSort, this.#contentContainer);
  }

  #renderContainerMovies() {
    render(this.#containerMovies, this.#contentContainer);
  }

  #renderListMovies() {
    render(this.#moviesList, this.#containerMovies.element);
  }

  #renderListMoviesExtra(addClass) {
    const listExtra = new MoviesList();
    const header = listExtra.element.querySelector('.films-list__title');

    listExtra.element.classList.add('films-list--extra');
    listExtra.element.classList.add(addClass);

    header.classList.remove('visually-hidden');
    header.textContent = addClass === CLASS_EXTRA.RATING ? 'Top rated' : 'Most commented';

    render(listExtra, this.#containerMovies.element);
    this.#renderCards({ container: listExtra.element });
  }

  #renderCards = ({ container }) => {
    if (container.classList.contains(CLASS_EXTRA.RATING)) {
      const moviesRating = [...this.#movies].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
        .slice(0, 2);
      moviesRating.forEach((movie) => this.#renderCardMovie({ containerCards: container, movie }));
      return;
    }

    if (container.classList.contains(CLASS_EXTRA.COMMENT)) {
      const moviesComments = [...this.#movies].sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, 2);
      moviesComments.forEach((movie) => this.#renderCardMovie({ containerCards: container, movie }));
      return;
    }

    this.#movies
      .slice(0, Math.min(this.#movies.length, this.#renderedMoviesCount))
      .forEach((movie) => this.#renderCardMovie({ containerCards: container, movie }));
  };

  #renderCardMovie({ containerCards, movie }) {
    const movieCard = new MovieCardPresenter({
      containerCards,
      comments: this.#comments,
      bodyContainer: this.#bodyContainer
    });

    movieCard.init(movie);
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
      .forEach((movie) => this.#renderCardMovie({ containerCards: this.#moviesList.element, movie }));

    this.#renderedMoviesCount += MOVIES_COUNT_PER_STEP;

    if (this.#renderedMoviesCount >= this.#movies.length) {
      remove(this.#showMoreButton);
    }
  };

  #renderNumberOfFilms() {
    render(this.#numberOfFilms, this.#containerNumberOfFilms);
  }
}
