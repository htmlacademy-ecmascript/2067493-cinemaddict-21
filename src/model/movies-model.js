import CommentsModel from './comments-model.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class MoviesModel extends Observable {
  #movies = [];
  #commentsModel = null;
  #moviesApiService = null;
  constructor({ moviesApiService, commentsApiSevice }) {
    super();
    this.#commentsModel = new CommentsModel({commentsApiSevice });
    this.#moviesApiService = moviesApiService;

    this.#commentsModel.addObserver(this.#changeComments);
  }

  get movies() {
    return this.#movies;
  }

  get commentsModel() {
    return this.#commentsModel;
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

  updateMovie(updateType, update) {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    this.#movies = [
      ...this.#movies.slice(0, index),
      update,
      ...this.#movies.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  #changeComments = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    const comments = this.commentsModel.comments.get(update.id);
    this.#movies[index].comments = comments.map((comment) => comment.id);
    this._notify(updateType, this.#movies[index]);
  };
}
