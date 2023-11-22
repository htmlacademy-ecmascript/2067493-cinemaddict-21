import { FILTER_TYPE } from './const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const filters = {
  [FILTER_TYPE.ALL]: (movies) => [...movies],
  [FILTER_TYPE.WATCHLIST]: (movies) => movies.filter((movie) => movie.userDetails.watchlist),
  [FILTER_TYPE.HISTORY]: (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched),
  [FILTER_TYPE.FAVORITES]: (movies) => movies.filter((movie) => movie.userDetails.favorite)
};

const SECOND_PER_MINUTE = 60;
const MILISECOND_PER_SECOND = 1000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomIntegerRating = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return result.toFixed(1);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomDate = () => dayjs().subtract(getRandomInteger(0, 14), 'year')
  .subtract(getRandomInteger(0, 5), 'month')
  .subtract(getRandomInteger(0, 30), 'day')
  .startOf('date')
  .toDate();

const dateWathing = () => dayjs().subtract(getRandomInteger(0, 14), 'day')
  .subtract(getRandomInteger(0, 5), 'hour')
  .subtract(getRandomInteger(0, 30), 'minute')
  .toDate();

const getDateFormate = (date, dateFormate) => dayjs(date).format(dateFormate);

const durationMovies = (minute, format) => dayjs.duration(SECOND_PER_MINUTE * minute * MILISECOND_PER_SECOND).format(format);

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);
const diffDate = (dateA, dateB) => dayjs(dateB).diff(dayjs(dateA));
export { diffDate, filters , getRandomArrayElement, getRandomIntegerRating, getRandomInteger, dateWathing, getRandomDate, getDateFormate, durationMovies, updateItem };
