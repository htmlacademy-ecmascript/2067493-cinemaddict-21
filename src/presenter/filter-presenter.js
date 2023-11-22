import Filter from '../view/filter.js';
import { filters } from '../utils.js';
import { render, replace, RenderPosition } from '../framework/render.js';
import { FILTER_TYPE, UpdateType } from '../const.js';

export default class FilterPresenter {
  #filtersModel = null;
  #moviesModel = null;

  #filterComponent = null;
  #filterContainer = null;

  constructor ({filtersModel, moviesModel, container}) {
    this.#filtersModel = filtersModel;
    this.#moviesModel = moviesModel;
    this.#filterContainer = container;

    this.#moviesModel.addObserver(this.#handleEventModel);
    this.#filtersModel.addObserver(this.#handleEventModel);
  }

  init() {
    const filtersMovies = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new Filter({
      filters: filtersMovies,
      currentFilterType: this.#filtersModel.filter,
      onChangeFilter: this.#handleChangeFilter
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
  }

  get filters () {
    const movies = this.#moviesModel.movies;

    return Object.values(FILTER_TYPE).map((type) => ({
      type,
      count: filters[type](movies).length
    }));
  }

  #handleEventModel = () =>{
    this.init();
  };

  #handleChangeFilter = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
