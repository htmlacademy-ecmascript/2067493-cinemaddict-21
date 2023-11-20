import { createMovie } from '../moks/movies-moks.js';
import { comments } from '../moks/comment-moks.js';
import Observable from '../framework/observable.js';

const MOVIES_COUNT = 23;

export default class MoviesModel extends Observable{
  #movies = Array.from({length: MOVIES_COUNT}, createMovie);
  #comments = comments;
  #comentsMovie = new Map();

  #getCommentsMovie() {
    this.#movies.forEach((movie) => {
      const movieCommentsArray = [];
      movie.comments.forEach((comment) => movieCommentsArray.push(this.#comments.find((commentsItem) => commentsItem.id === comment)));
      this.#comentsMovie.set(movie.id, movieCommentsArray);
    });
  }

  get commentsMovie () {
    if(this.#comentsMovie.size === 0) {
      this.#getCommentsMovie();
    }

    return this.#comentsMovie;
  }

  get comments() {
    return this.#comments;
  }

  get movies() {
    return this.#movies;
  }
}
