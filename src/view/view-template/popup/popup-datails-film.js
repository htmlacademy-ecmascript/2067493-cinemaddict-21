import { FORMATE_DATE } from '../../../const.js';
import { getDateFormate, durationMovies } from '../../../utils.js';

function createPopupDetailsFilm ({filmInfo, userDetails}) {
  const {title, alternativeTitle, totalRating, director, writers, actors, releas, duration, description, genre, poster, ageRating } = filmInfo;
  const {watchlist, alreadyWatched, favorite} = userDetails;
  const classActive = 'film-details__control-button--active';

  const createGenre = (itemGenre) => `<span class="film-details__genre">${itemGenre}</span>`;

  return `
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
     <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${poster}" alt="">

        <p class="film-details__age">${ageRating}</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${alternativeTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${totalRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${writers.join(', ')}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actors.join(', ')}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${getDateFormate(releas.date, FORMATE_DATE.releasDatePopup)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Duration</td>
            <td class="film-details__cell">${durationMovies(duration, FORMATE_DATE.durationMovies)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${releas.releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${genre.length > 1 ? 'Genres' : 'Genre'}</td>
            <td class="film-details__cell">
              ${genre.map(createGenre).join(' ')}
          </tr>
        </table>

        <p class="film-details__film-description">
          ${description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist ? classActive : '' }" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched ${ alreadyWatched ? classActive : ''}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite ${ favorite ? classActive : ''}" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>
  `;
}

export {createPopupDetailsFilm};
