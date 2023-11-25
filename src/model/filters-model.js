import Observable from '../framework/observable.js';
import { FILTER_TYPE } from '../const.js';

export default class FilterModel extends Observable {
  #filer = FILTER_TYPE.ALL;

  get filter () {
    return this.#filer;
  }

  setFilter(updateType, filter) {
    this.#filer = filter;
    this._notify(updateType, filter);
  }
}
