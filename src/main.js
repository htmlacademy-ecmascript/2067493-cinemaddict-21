import Presenter from '../src/presenter/presenter.js';
import MoviesModel from './model/movies-model.js';
import { comments } from './moks/comment-moks.js';

const containerInfoUser = document.querySelector('.header');
const contentContainer = document.querySelector('.main');
const containerNumberOfFilms = document.querySelector('.footer__statistics');

const moviesModel = new MoviesModel ({movieComments: comments});

const presenter = new Presenter ({containerInfoUser, contentContainer, containerNumberOfFilms, moviesModel: moviesModel.movies });
presenter.init();

