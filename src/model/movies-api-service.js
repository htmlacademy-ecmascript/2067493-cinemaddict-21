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

  async updateMovies (movie) {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptMoviesToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }


  #adaptMoviesToServer (movie) {
    const adaptReleas = (releasInfoFilm) => {
      const release = {
        ...releasInfoFilm,
        date: releasInfoFilm.date.toISOString(),
        'release_country': releasInfoFilm.releaseCountry
      };

      delete release.releaseCountry;

      return release;
    };

    const adaptFilmsInfo = (infoFilms) => {
      const filmsInfo = {
        ...infoFilms,
        'alternative_title': infoFilms.alternativeTitle,
        'age_rating': infoFilms.ageRating,
        'total_rating': infoFilms.totalRating,
        release: adaptReleas(infoFilms.release),
      };

      delete filmsInfo.alternativeTitle;
      delete filmsInfo.ageRating;
      delete filmsInfo.totalRating;

      return filmsInfo;
    };

    const adaptUserDetails = (userDetailAdapt) => {
      const userDetails = {
        ...userDetailAdapt,
        'already_watched': userDetailAdapt.alreadyWatched,
        'watching_date': userDetailAdapt.watchingDate instanceof Date ? userDetailAdapt.watchingDate.toISOString() : null,
      };

      delete userDetails.alreadyWatched;
      delete userDetails.watchingDate;

      return userDetails;
    };

    const adaptMovies = {
      ...movie,
      'film_info': adaptFilmsInfo(movie.filmInfo),
      'user_details': adaptUserDetails(movie.userDetails)
    };

    delete adaptMovies.filmInfo;
    delete adaptMovies.userDetails;

    return adaptMovies;
  }
}
