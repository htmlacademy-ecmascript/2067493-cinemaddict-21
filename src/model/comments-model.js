import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #commentsApiSevice = null;

  constructor ({commentsApiSevice}) {
    super();
    this.#commentsApiSevice = commentsApiSevice;
  }

  async getComments(movieId) {
    const comments = await this.#commentsApiSevice.getComments(movieId);
    const adaptComments = this.#adaptComments(comments);
    return adaptComments;
  }

  #adaptComments (comments) {
    const adaptComments = comments.map((comment) => ({
      ...comment,
      date: new Date(comment.date)
    }));

    return adaptComments;
  }

  // addComments(updateType, update) {
  //   const newComment = {...update.comment,
  //     id: nanoid(),
  //     author: getRandomArrayElement(ACTORS),
  //     date: new Date()
  //   };

  //   this.#comments.get(update.id).push(newComment);

  //   this._notify(updateType, update);
  // }

  // deleteComments(updateType, update) {
  //   const index = this.#comments.get(update.id).findIndex((item) => item.id === update.comment);

  //   this.#comments.get(update.id).splice(index, 1);

  //   this._notify(updateType, update);
  // }
}
