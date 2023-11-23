import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};
export default class CommentsApiService extends ApiService {
  getComments(url) {
    return this._load({
      url: `${url}`
    })
      .then(ApiService.parseResponse);
  }
}
