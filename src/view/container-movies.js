import AbstractView from '../framework/view/abstract-view.js';
import { createMoviesContainerTemplate } from './view-template/movies-container-template.js';

export default class MoviesContainer extends AbstractView {
  get template() {
    return createMoviesContainerTemplate();
  }
}
