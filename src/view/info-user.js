import AbstractView from '../framework/view/abstract-view.js';
import {createInfoUserTemplate} from './view-template/info-user-template.js';

const STATUS_USER = {
  NOVICE: 'novice',
  FAN: 'fan',
  MOVIE_BUF: 'movie buff'
};
export default class InfoUser extends AbstractView {
  #historyCount = null;
  #status = '';
  constructor({historyCount}){
    super();
    this.#historyCount = historyCount;
    this.#status = this.#getStatus();
  }

  get template() {
    return createInfoUserTemplate(this.#status);
  }

  #getStatus = () => {
    if(this.#historyCount < 1) {
      return '';
    }
    if(this.#historyCount <= 10){
      return STATUS_USER.NOVICE;
    }
    if(this.#historyCount <= 20){
      return STATUS_USER.FAN;
    }

    return STATUS_USER.MOVIE_BUF;
  };
}
