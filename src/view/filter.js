import AbstractView from '../framework/view/abstract-view.js';
import { createFilterTemplate } from './view-template/filter-template.js';

export default class Filter extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
