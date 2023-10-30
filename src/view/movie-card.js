import AbstractView from '../framework/view/abstract-view.js';
import { createMovieCardTemplate } from './view-template/movie-card-template.js';

export default class MovieCard extends AbstractView {
  #movie = [];
  constructor ({movie}) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createMovieCardTemplate(this.#movie);
  }
}
