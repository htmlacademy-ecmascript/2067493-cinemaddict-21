import { nanoid } from 'nanoid';
import { getRandomArrayElement, getRandomIntegerRating, getRandomInteger, dateWathing, getRandomDate} from '../utils.js';
import {COUTNRY, GENRE, WRITERS, ACTORS, DIRECTOR, DESCRIPTION, POSTERS, AGE_RATING, RATING, ALTERNATIVE_TITLE, TITLE} from '../const.js';
import { commentsId } from './comment-moks.js';

function createMovie () {
  const numberTitle = getRandomInteger(0, TITLE.length - 1);
  const stayWatching = !!getRandomInteger(0, 1);
  const getWathingDate = () => stayWatching ? dateWathing() : null;
  const indexComments = getRandomInteger(commentsId.length / 4, commentsId.length);

  return {
    id: nanoid(),
    comments: [
      ...commentsId.slice(getRandomInteger(0,indexComments), indexComments),
      ...commentsId.slice(indexComments + 1)
    ],
    filmInfo: {
      title: TITLE[numberTitle],
      alternativeTitle: ALTERNATIVE_TITLE[numberTitle],
      description: getRandomArrayElement(DESCRIPTION),
      totalRating: getRandomIntegerRating(RATING.MIN, RATING.MAX),
      poster: getRandomArrayElement(POSTERS),
      ageRating: getRandomArrayElement(AGE_RATING),
      director: getRandomArrayElement(DIRECTOR),
      writers: WRITERS.slice(0, getRandomInteger(1, WRITERS.length)),
      actors: ACTORS.slice(0, getRandomInteger(1, ACTORS.length)),
      genre: GENRE.slice(0, getRandomInteger(1, GENRE.length)),
      duration: getRandomInteger(80, 200),
      releas: {
        date: getRandomDate(),
        releaseCountry: getRandomArrayElement(COUTNRY),
      }
    },
    userDetails: {
      watchlist: !!getRandomInteger(0, 1) ,
      alreadyWatched: stayWatching,
      watchingDate: getWathingDate(),
      favorite: !!getRandomInteger(0, 1),
    }
  };
}

export {createMovie};
