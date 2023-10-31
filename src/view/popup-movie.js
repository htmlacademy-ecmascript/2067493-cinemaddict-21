import AbstractView from '../framework/view/abstract-view.js';
import { createPopupTemplate } from './view-template/popup/popup-template.js';

export default class PopupMovie extends AbstractView {
  #movie = {};
  #comments = [];

  constructor ({movie, comments}) {
    super();
    this.#movie = movie;
    this.#comments = comments;
  }

  get template () {
    return createPopupTemplate({movie: this.#movie, comments: this.#comments});
  }
}
