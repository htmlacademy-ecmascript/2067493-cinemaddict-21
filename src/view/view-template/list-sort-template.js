import { SORT_TYPE } from '../../const.js';

function createListSortTemplate () {
  return `
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type=${SORT_TYPE.DEFAULT}>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type=${SORT_TYPE.DATE}>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type=${SORT_TYPE.RETING}>Sort by rating</a></li>
  </ul>
  `;
}

export {createListSortTemplate};
