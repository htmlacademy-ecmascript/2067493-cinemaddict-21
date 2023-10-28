import AbstractView from '../framework/view/abstract-view.js';
import { createMovieCardTemplate } from './view-template/movie-card-template.js';

export default class MovieCard extends AbstractView {
  get template() {
    return createMovieCardTemplate();
  }
}
