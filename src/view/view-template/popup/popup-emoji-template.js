function createPopupEmojiTemplate(emoji, userEmoji, isDisable) {
  return emoji.map((item) =>
    `<input class="film-details__emoji-item visually-hidden"
      name="comment-emoji"
      type="radio"
      id="emoji-${item}"
      value="${item}"
      ${userEmoji === item ? 'checked' : ''}
      ${isDisable ? 'disabled' : ''}>
      <label class="film-details__emoji-label" for="emoji-${item}">
        <img src="./images/emoji/${item}.png" width="30" height="30" alt="emoji">
      </label>`).join(' ');
}

export { createPopupEmojiTemplate };
