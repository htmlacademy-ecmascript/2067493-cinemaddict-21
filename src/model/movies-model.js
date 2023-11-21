import { createMovie } from '../moks/movies-moks.js';
import { CommentsModel } from './comments-model.js';
import Observable from '../framework/observable.js';

const MOVIES_COUNT = 23;

export default class MoviesModel extends Observable{
  #movies = Array.from({length: MOVIES_COUNT}, createMovie);
  #commentsModel = null;

  constructor() {
    super();
    this.#commentsModel = new CommentsModel({movies: this.movies});

    this.#commentsModel.addObserver(this.#addComments);
  }

  get movies() {
    return this.#movies;
  }

  get comments() {
    return this.#commentsModel.comments;
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

  #addComments = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    this.#movies[index].comments.push(update.comments.id);

    this._notify(updateType, update);
  };
}
