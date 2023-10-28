import AbstractView from '../framework/view/abstract-view.js';
import { createListSortTemplate } from './view-template/list-sort-template.js';

export default class ListSort extends AbstractView {
  get template () {
    return createListSortTemplate();
  }
}
