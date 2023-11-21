import { FORMATE_DATE } from '../../../const.js';
import { getDateFormate} from '../../../utils.js';

function createPopupCommentFilm (commentFilm) {
  const {comment, emotion, author, date, id} = commentFilm;
  return `
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${getDateFormate(date, FORMATE_DATE.commentDate)}</span>
        <button class="film-details__comment-delete" data-comment-id-value="${id}">Delete</button>
      </p>
    </div>
  </li>
  `;
}

export {createPopupCommentFilm};
