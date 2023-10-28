import AbstractView from '../framework/view/abstract-view.js';
import { createMoviesListTemplate } from './view-template/movies-list-template.js';

export default class MoviesList extends AbstractView {
  get template() {
    return createMoviesListTemplate();
  }
}
