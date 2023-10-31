import { createMovie } from '../moks/movies-moks.js';

const MOVIES_COUNT = 33;

export default class MoviesModel {
  #movies = Array.from({length: MOVIES_COUNT}, createMovie);
  #comments = null;
  #comentsMovie = new Map();

  constructor ({movieComments}){
    this.#comments = movieComments;
  }

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
