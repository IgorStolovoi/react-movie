import { connect } from "react-redux";
import MoviesList from "./MoviesList";
import { fetchMoviesList } from "../../thunks/movies";
import { changePage } from "../../actions/filters";

const mapStateToProps = (state) => ({
  moviesList: state.movies.moviesList,
  searchString: state.moviesFilters.queryString,
  err: state.movies.error,
  totalPages: state.moviesFilters.totalPages,
  currentPage: state.moviesFilters.filters.page,
  loadingStatus: state.movies.isLoading,
});
const mapDispatchToProps = {
  fetchMoviesList,
  changePage,
};

const MoviesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesList);

export default MoviesListContainer;
