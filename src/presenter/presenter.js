import InfoUser from '../view/info-user.js';
import Filter from '../view/filter.js';
import ListSort from '../view/list-sort.js';
import ContainerMovies from '../view/container-movies.js';
import MoviesList from '../view/movies-list.js';
import MovieCard from '../view/movie-card.js';
import NumberOfFilms from '../view/number-of-films.js';
import { render } from '../framework/render.js';

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

  constructor({ containerInfoUser, contentContainer, containerNumberOfFilms }) {
    this.#containerInfoUser = containerInfoUser;
    this.#contentContainer = contentContainer;
    this.#containerNumberOfFilms = containerNumberOfFilms;
  }

  init() {
    this.#renderInfoUser();
    this.#renderFilter();
    this.#renderListSort();
    this.#renderContainerMovies();
    this.#renderListMovies();
    this.#renderCards({ container: this.#moviesList.element });

    for(let i = 1; i <= 2; i++) {
      this.#renderListMoviesExtra();
    }

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

  #renderListMoviesExtra() {
    const listExtra = new MoviesList();
    listExtra.element
      .classList.add('films-list--extra');
    render(listExtra, this.#containerMovies.element);
    this.#renderCards({container: listExtra.element});
  }

  #renderCards = ({ container }) => {
    if (container.classList.contains('films-list--extra')) {
      for (let i = 1; i <= 2; i++) {
        this.#renderCardMovie({ containerCards: container });
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        this.#renderCardMovie({ containerCards: container });
      }
    }
  };

  #renderCardMovie({ containerCards }) {
    const movieCard = new MovieCard();
    const container = containerCards.querySelector('.films-list__container');
    render(movieCard, container);
  }

  #renderNumberOfFilms() {
    render(this.#numberOfFilms, this.#containerNumberOfFilms);
  }
}
