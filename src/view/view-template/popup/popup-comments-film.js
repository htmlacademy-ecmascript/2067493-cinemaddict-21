import he from 'he';
import { FORMATE_DATE } from '../../../const.js';
import { getDateFormate} from '../../../utils.js';

function createPopupCommentFilm (commentFilm, movie) {
  const {comment, emotion, author, date, id} = commentFilm;
  const {isDeleting, isDisable} = movie;
  return `
  <li class="film-details__comment" id="${id}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${getDateFormate(date, FORMATE_DATE.commentDate)}</span>
        <button class="film-details__comment-delete" data-comment-id-value="${id}" ${isDisable ? 'disabled' : ''}>
        ${isDeleting ? 'Deleting...' : 'Delete'}</button>
      </p>
    </div>
  </li>
  `;
}

export {createPopupCommentFilm};
