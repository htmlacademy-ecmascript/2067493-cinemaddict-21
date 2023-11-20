import Observable from '../framework/observable.js';
import { comments } from '../moks/comment-moks.js';

export class CommentsModel extends Observable {
  #movies = null;
  #comments = new Map ();
  constructor ({movies}) {
    super();
    this.#movies = movies;
  }

  #getCommentsMovie() {
    this.#movies.forEach((movie) => {
      const movieCommentsArray = [];
      movie.comments.forEach((comment) => movieCommentsArray.push(comments.find((commentsItem) => commentsItem.id === comment)));
      this.#comments.set(movie.id, movieCommentsArray);
    });
  }

  get comments() {
    if(this.#comments.size === 0) {
      this.#getCommentsMovie();
    }

    return this.#comments;
  }
}
