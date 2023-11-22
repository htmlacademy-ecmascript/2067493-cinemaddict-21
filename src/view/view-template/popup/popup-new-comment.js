import he from 'he';

function createNewComment(comment, emoji) {
  return `
      <div class="film-details__add-emoji-label">
        ${emoji ?
    `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}"></img>`
    : ''}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(comment)}</textarea>
      </label>

  `;
}

export {createNewComment};
