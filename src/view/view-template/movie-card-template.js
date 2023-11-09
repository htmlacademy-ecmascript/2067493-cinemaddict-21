import { getDateFormate, durationMovies } from '../../utils.js';
import { FORMATE_DATE } from '../../const.js';

function createMovieCardTemplate({filmInfo, comments, userDetails}) {
  const {title, totalRating, releas, duration, description, genre, poster } = filmInfo;
  const {watchlist, alreadyWatched, favorite} = userDetails;
  const classActive = 'film-details__control-button--active';

  return `
 <article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getDateFormate(releas.date, FORMATE_DATE.yaerReleas)}</span>
        <span class="film-card__duration">${durationMovies(duration, FORMATE_DATE.durationMovies)}</span>
        <span class="film-card__genre">${genre.join(' ')}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">${comments.length}</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlistм ${watchlist ? classActive : '' }" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${ alreadyWatched ? classActive : ''}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${ favorite ? classActive : ''}" type="button">Mark as favorite</button>
    </div>
  </article>
 `;
}

export {createMovieCardTemplate};
