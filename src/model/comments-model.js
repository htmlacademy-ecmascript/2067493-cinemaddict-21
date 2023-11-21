import Observable from '../framework/observable.js';
import { ACTORS } from '../const.js';
import { comments } from '../moks/comment-moks.js';
import { nanoid } from 'nanoid';
import { getRandomArrayElement } from '../utils.js';

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

  addComments(updateType, update) {
    const newComment = {...update.comment,
      id: nanoid(),
      author: getRandomArrayElement(ACTORS),
      date: new Date()
    };

    this.#comments.get(update.id).push(newComment);

    this._notify(updateType, update);
  }

  deleteComments(updateType, update) {
    const index = this.#comments.get(update.id).findIndex((item) => item.id === update.comment);

    this.#comments.get(update.id).splice(index, 1);

    this._notify(updateType, update);
  }
}
