import Presenter from '../src/presenter/presenter.js';

const containerInfoUser = document.querySelector('.header');
const contentContainer = document.querySelector('.main');
const containerNumberOfFilms = document.querySelector('.footer__statistics');

const presenter = new Presenter ({containerInfoUser, contentContainer, containerNumberOfFilms});
presenter.init();
