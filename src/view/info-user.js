import AbstractView from '../framework/view/abstract-view.js';
import {createInfoUserTemplate} from './view-template/info-user-template.js';

export default class InfoUser extends AbstractView {
  get template() {
    return createInfoUserTemplate();
  }
}
