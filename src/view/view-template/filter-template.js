import { FILTER_TYPE } from '../../const.js';

function createItemFilterTemplate(filter, currentFilterType) {
  const {type, count} = filter;
  const classActive = 'main-navigation__item--active';
  return `
  <a href="#${type.toLowerCase()}"
  class="main-navigation__item ${type === currentFilterType ? classActive : ''}" data-filter-type="${type}">
  ${type === FILTER_TYPE.ALL ? 'All movies'
    : `${type} <span class="main-navigation__item-count" data-filter-type="${type}"> ${count}</span>`}</a>
  `;
}

function createFilterTemplate(filters, currentFilterType) {
  const filtersItems = filters.map((filter) => createItemFilterTemplate(filter, currentFilterType))
    .join('');
  return `
  <nav class="main-navigation">
    ${filtersItems}
  </nav>
  `;
}

export {createFilterTemplate};
