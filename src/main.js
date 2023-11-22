import Presenter from '../src/presenter/presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MoviesModel from './model/movies-model.js';
import FilterModel from './model/filters-model.js';

const containerInfoUser = document.querySelector('.header');
const contentContainer = document.querySelector('.main');
const containerNumberOfFilms = document.querySelector('.footer__statistics');
const body = document.querySelector('body');

const moviesModel = new MoviesModel ();
const filtersModel = new FilterModel ();

const filterPresenter = new FilterPresenter ({
  filtersModel,
  moviesModel,
  container: contentContainer
});

const presenter = new Presenter ({containerInfoUser, contentContainer,
  containerNumberOfFilms, moviesModel, filtersModel, body});

presenter.init();
filterPresenter.init();

