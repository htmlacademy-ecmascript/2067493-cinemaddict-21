const FORMATE_DATE = {
  yaerReleas: 'YYYY',
  durationMovies:'H[h] m[m]',
  releasDatePopup: 'DD MMMM YYYY',
  commentDate: 'YYYY/MM/DD HH:mm'
};

const FILTER_TYPE = {
  ALL: 'All',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites'
};

const SORT_TYPE = {
  DEFAULT: 'default',
  DATE: 'date',
  RETING: 'reting'
};

const EMOJI = ['smile','sleeping','puke','angry'];

const UpdateType = {
  PATH: 'path',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'INIT'
};

const UserAction = {
  UPDATE: 'update',
  DELETE_COMMENT: 'delete comment',
  ADD_COMMENT: 'add comment'
};

export { FORMATE_DATE, FILTER_TYPE, SORT_TYPE, EMOJI, UserAction, UpdateType};
