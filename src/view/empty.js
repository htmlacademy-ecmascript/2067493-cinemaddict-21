import { createEmptyTemplate } from './view-template/empty-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class Empty extends AbstractView {
  get template () {
    return createEmptyTemplate();
  }
}
