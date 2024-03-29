const FilterType = {
  All: 'There are no movies in our database',
  Watchlist: 'There are no movies to watch now',
  History: 'There are no watched movies now',
  Favorites: 'There are no favorite movies now',
};

function createEmptyTemplate (type) {
  return `
  <section class="films-list">
      <h2 class="films-list__title">${FilterType[type]}</h2>
      <!--
        Значение отображаемого текста зависит от выбранного фильтра:
          * All movies - 'There are no movies in our database'
          * Watchlist — 'There are no movies to watch now';
          * History — 'There are no watched movies now';
          * Favorites — 'There are no favorite movies now'.
      -->
    </section>
  `;
}

export {createEmptyTemplate};
