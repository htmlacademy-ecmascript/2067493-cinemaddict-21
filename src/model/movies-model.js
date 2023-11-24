import Observable from '../framework/observable.js';
import { UpdateType} from '../const.js';

export default class MoviesModel extends Observable {
  #movies = [];
  #commentsApiSevice = null;
  #moviesApiService = null;
  constructor({ moviesApiService, commentsApiSevice }) {
    super();
    this.#commentsApiSevice = commentsApiSevice;
    this.#moviesApiService = moviesApiService;
  }

  get movies() {
    return this.#movies;
  }

  async getComments(movieId) {
    const comments = await this.#commentsApiSevice.getComments(movieId);
    const adaptComments = this.#adaptComments(comments);
    return adaptComments;
  }

  async init() {
    try {
      const movies = await this.#moviesApiService.movies;
      this.#movies = movies.map(this.#adaptMovies);
    } catch {
      this.#movies = [];
    }
    this._notify(UpdateType.INIT);
  }

  #adaptMovies(movie) {
    const adaptReleas = (releasInfoFilm) => {
      const releas = {
        ...releasInfoFilm,
        date: new Date(releasInfoFilm['date']),
        releaseCountry: releasInfoFilm['release_country']
      };

      delete releas['release_country'];

      return releas;
    };

    const adaptFilmsInfo = (infoFilms) => {
      const filmsInfo = {
        ...infoFilms,
        alternativeTitle: infoFilms['alternative_title'],
        ageRating: infoFilms['age_rating'],
        totalRating: infoFilms['total_rating'],
        release: adaptReleas(infoFilms.release),
      };

      delete filmsInfo['alternative_title'];
      delete filmsInfo['age_rating'];
      delete filmsInfo['total_rating'];

      return filmsInfo;
    };

    const adaptUserDetails = (userDetailAdapt) => {
      const userDetails = {
        ...userDetailAdapt,
        alreadyWatched: userDetailAdapt['already_watched'],
        watchingDate: userDetailAdapt['watching_date'] === null ? null : new Date(userDetailAdapt['watching_date']),
      };

      delete userDetails['watching_date'];
      delete userDetails['already_watched'];

      return userDetails;
    };

    const adaptMovies = {
      ...movie,
      filmInfo: adaptFilmsInfo(movie['film_info']),
      userDetails: adaptUserDetails(movie['user_details'])
    };

    delete adaptMovies['film_info'];
    delete adaptMovies['user_details'];

    return adaptMovies;
  }

  async updateMovie(updateType, update) {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);
    try {
      const response = await this.#moviesApiService.updateMovies(update);
      const updateMovie = this.#adaptMovies(response);

      this.#movies = [
        ...this.#movies.slice(0, index),
        updateMovie,
        ...this.#movies.slice(index + 1)
      ];
      this._notify(updateType, update);
    } catch {
      throw new Error('Can\'t update movies');
    }
    this._notify(updateType, update);
  }

  #adaptComments(comments) {
    const adaptComments = comments.map((comment) => ({
      ...comment,
      date: new Date(comment.date)
    }));

    return adaptComments;
  }

  async addComment(updateType, update) {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);
    try {
      const response = await this.#commentsApiSevice.addComment(update);
      const updateMovie = this.#adaptMovies(response.movie);
      this.#movies = [
        ...this.#movies.slice(0, index),
        updateMovie,
        ...this.#movies.slice(index + 1)
      ];
      this._notify(updateType, updateMovie);
    } catch {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComments(updateType, update) {
    try {
      console.log(update.movie);
      await this.#commentsApiSevice.deleteComment(update);
      this._notify(updateType, update.movie);
    } catch {
      throw new Error('Can\'t delete comments');
    }
  }
}
