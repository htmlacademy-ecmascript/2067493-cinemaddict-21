function createPopupEmojiTemplate(emoji, userEmoji) {
  return emoji.map((item) =>
    `<input class="film-details__emoji-item visually-hidden"
      name="comment-emoji"
      type="radio"
      id="emoji-${item}"
      value="${item}"
      ${userEmoji === item ? 'checked' : ''}>
      <label class="film-details__emoji-label" for="emoji-${item}">
        <img src="./images/emoji/${item}.png" width="30" height="30" alt="emoji">
      </label>`).join(' ');
}

export { createPopupEmojiTemplate };
