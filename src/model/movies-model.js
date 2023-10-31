import { createMovie } from '../moks/movies-moks.js';

const MOVIES_COUNT = 33;

export default class MoviesModel {
  #movies = Array.from({length: MOVIES_COUNT}, createMovie);
  #comments = null;

  constructor ({movieComments}){
    this.#comments = movieComments;
  }

  get comments() {
    return this.#comments;
  }

  get movies() {
    return this.#movies;
  }
}
