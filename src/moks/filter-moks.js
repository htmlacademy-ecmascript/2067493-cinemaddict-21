import { filters } from '../utils.js';

function generateFilters(movies) {
  return Object.entries(filters)
    .map(([filterType, filterMovies]) => ({
      type: filterType,
      count: filterMovies(movies).length
    }));
}

export {generateFilters};
