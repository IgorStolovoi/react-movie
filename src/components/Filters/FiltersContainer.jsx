import { connect } from "react-redux";
import { addFilter, generateQuery } from "../../actions/filters";
import Filters from "./Filters";
import { fetchGenresList, fetchLanguageList } from "../../thunks/filters";
const mapStateToProps = (state) => ({
  filters: state.moviesFilters.filters,
  genresList: state.moviesFilters.genresList,
  laguageList: state.moviesFilters.languagesList,
  err: state.moviesFilters.error,
});
const mapDispatchToProps = {
  addFilter,
  fetchGenresList,
  generateQuery,
  fetchLanguageList,
};

const FiltersContainer = connect(mapStateToProps, mapDispatchToProps)(Filters);

export default FiltersContainer;
