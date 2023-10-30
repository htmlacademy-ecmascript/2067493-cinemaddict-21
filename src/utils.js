import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

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

export { getRandomArrayElement, getRandomIntegerRating, getRandomInteger, dateWathing, getRandomDate, getDateFormate, durationMovies };
