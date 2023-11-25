import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE'
};
export default class CommentsApiService extends ApiService {
  getComments(url) {
    return this._load({
      url: `${url}`
    })
      .then(ApiService.parseResponse);
  }

  async addComment(comment) {
    const response = await this._load({
      url: `${comment.id}`,
      method: Method.POST,
      body: JSON.stringify(comment.comment),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteComment(comment) {
    const response = await this._load({
      url: `${comment.comment}`,
      method: Method.DELETE,
    });

    return response;
  }
}
