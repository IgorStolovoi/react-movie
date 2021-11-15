export const ADD_MOVIES = "Add-Movies";
export const addMoviesList = (moviesList) => ({
  type: ADD_MOVIES,
  payload: moviesList,
});
////////////////////////////
export const MOVIES_ERROR = "Movies-Error";
export const errorMovies = (error) => ({
  type: MOVIES_ERROR,
  payload: error,
});
export const IS_LOADING = "Is-Loading";
export const isLoading = (status) => ({
  type: IS_LOADING,
  payload: status,
});
