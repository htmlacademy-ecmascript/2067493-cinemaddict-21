import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};
export default class MoviesApiService extends ApiService {
  get movies() {
    return this._load({
      url: 'movies'
    })
      .then(ApiService.parseResponse);
  }
}
