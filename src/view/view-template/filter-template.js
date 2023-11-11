import { FILTER_TYPE } from '../../const.js';


function createItemFilterTemplate(filter, isChekced) {
  const {type, count} = filter;
  const classActive = 'main-navigation__item--active';
  return `
  <a href="#${type.toLowerCase()}"
  class="main-navigation__item ${isChekced ? classActive : ''}">
  ${type === FILTER_TYPE.ALL ? 'All movies'
    : `${type} <span class="main-navigation__item-count">${count}</span>`}</a>
  `;
}

function createFilterTemplate(filters) {
  const filtersItems = filters.map((filter, index) => createItemFilterTemplate(filter, index === 0))
    .join('');
  return `
  <nav class="main-navigation">
    ${filtersItems}
  </nav>
  `;
}

export {createFilterTemplate};
