import InfoUser from '../view/info-user.js';
import Filter from '../view/filter.js';
import ListSort from '../view/list-sort.js';
import ContainerMovies from '../view/container-movies.js';
import MoviesList from '../view/movies-list.js';
import MovieCard from '../view/movie-card.js';
import NumberOfFilms from '../view/number-of-films.js';
import { render } from '../framework/render.js';

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
  #containerInfoUser = null;
  #contentContainer = null;
  #containerNumberOfFilms = null;
  #movies = [];

  constructor({ containerInfoUser, contentContainer, containerNumberOfFilms, moviesModel }) {
    this.#containerInfoUser = containerInfoUser;
    this.#contentContainer = contentContainer;
    this.#containerNumberOfFilms = containerNumberOfFilms;
    this.#movies = moviesModel;
  }

  init() {
    this.#renderInfoUser();
    this.#renderFilter();
    this.#renderListSort();
    this.#renderContainerMovies();
    this.#renderListMovies();
    this.#renderCards({ container: this.#moviesList.element });
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

    listExtra.element.classList.add('films-list--extra');
    listExtra.element.classList.add(addClass);

    render(listExtra, this.#containerMovies.element);
    this.#renderCards({ container: listExtra.element });
  }

  #renderCards = ({ container }) => {
    if (container.classList.contains(CLASS_EXTRA.RATING)) {
      const moviesRating = [...this.#movies.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)]
        .slice(0, 2);
      moviesRating.forEach((movie) => this.#renderCardMovie({ containerCards: container, movie }));
      return;
    }

    if (container.classList.contains(CLASS_EXTRA.COMMENT)) {
      const moviesComments = [...this.#movies.sort((a, b) => b.comments.length - a.comments.length)]
        .slice(0, 2);
      moviesComments.forEach((movie) => this.#renderCardMovie({ containerCards: container, movie }));
      return;
    }
    this.#movies.forEach((movie) => this.#renderCardMovie({ containerCards: container, movie }));

  };

  #renderCardMovie({ containerCards, movie }) {
    const movieCard = new MovieCard({ movie });
    const container = containerCards.querySelector('.films-list__container');
    render(movieCard, container);
  }

  #renderNumberOfFilms() {
    render(this.#numberOfFilms, this.#containerNumberOfFilms);
  }
}
