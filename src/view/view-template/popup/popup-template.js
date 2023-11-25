import { createPopupDetailsFilm } from './popup-datails-film.js';
import { createPopupCommentFilm } from './popup-comments-film.js';
import { createPopupEmojiTemplate } from './popup-emoji-template.js';
import { createNewComment } from './popup-new-comment.js';
import { EMOJI } from '../../../const.js';

function createPopupTemplate ({movie}) {
  const commentsFilm = movie.comments;

  return `
  <div class="film-details__inner">
    ${createPopupDetailsFilm(movie)}

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsFilm.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentsFilm.map((comment) => createPopupCommentFilm(comment, movie)).join(' ')}
        </ul>

        <form class="film-details__new-comment" action="" method="get" >
          ${createNewComment(movie.userTextComment, movie.userEmoji, movie.isDisable)}
          <div class="film-details__emoji-list">
            ${createPopupEmojiTemplate(EMOJI, movie.userEmoji, movie.isDisable)}
          </div>
        </form>
      </section>
    </div>
  </div>
  `;
}

export {createPopupTemplate};
