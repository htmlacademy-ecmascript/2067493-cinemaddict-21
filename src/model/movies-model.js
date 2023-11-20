import { createMovie } from '../moks/movies-moks.js';
import Observable from '../framework/observable.js';

const MOVIES_COUNT = 23;

export default class MoviesModel extends Observable{
  #movies = Array.from({length: MOVIES_COUNT}, createMovie);

  get movies() {
    return this.#movies;
  }
}
