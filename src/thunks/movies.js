import { fetchMovies } from "../api/fetchMovies";
import { addPages } from "../actions/filters";
import { errorMovies, addMoviesList, isLoading } from "../actions/movies";
import noPhoto from "../assets/img/no_poster.jpg";
import { getCorrectImg } from "../utils/getCorrectImg";
export const fetchMoviesList = (queryString) => {
  return async (dispatch) => {
    try {
      dispatch(errorMovies(null));
      dispatch(isLoading(true));
      const movies = await fetchMovies(queryString).then((res) => {
        return res.data;
      });
      if (!movies.total_results) {
        dispatch(
          addPages({
            totalPages: movies.total_pages,
          })
        );
        dispatch(isLoading(false));
        dispatch(addMoviesList(movies.results));
        throw new Error("No results for this filters");
      }
      const moviesWithImg = movies.results.map((movie) => {
        return {
          ...movie,
          correctImg: movie.poster_path
            ? getCorrectImg(movie.poster_path)
            : noPhoto,
        };
      });
      dispatch(addMoviesList(moviesWithImg));
      dispatch(
        addPages({
          totalPages: movies.total_pages,
        })
      );
      dispatch(isLoading(false));
    } catch (e) {
      dispatch(isLoading(false));
      dispatch(errorMovies(e));
    }
  };
};
