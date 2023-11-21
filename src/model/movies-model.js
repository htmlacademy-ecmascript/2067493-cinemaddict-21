import { createMovie } from '../moks/movies-moks.js';
import Observable from '../framework/observable.js';

const MOVIES_COUNT = 23;

export default class MoviesModel extends Observable{
  #movies = Array.from({length: MOVIES_COUNT}, createMovie);

  get movies() {
    return this.#movies;
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
}
