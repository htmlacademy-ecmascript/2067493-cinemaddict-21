import { nanoid } from 'nanoid';
import { DESCRIPTION, ACTORS } from '../const.js';
import { getRandomArrayElement, getRandomDate} from '../utils.js';

function createComments () {
  return {
    id: nanoid(),
    comment: getRandomArrayElement(DESCRIPTION),
    emotion: 'smile',
    author: getRandomArrayElement(ACTORS),
    date: getRandomDate()
  };
}

const MOVIES_COUNT = 20;

const comments = Array.from({length: MOVIES_COUNT}, createComments);

const commentsId = comments.map((comment) => comment.id);

export {comments, commentsId};
