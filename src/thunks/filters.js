import { fetchGenres, fetchLanguages } from "../api/fetchFilters";
import { addGenres, filtersError, addLanguages } from "../actions/filters";
export const fetchGenresList = () => {
  return async (dispatch) => {
    try {
      const genres = await fetchGenres();
      dispatch(addGenres(genres));
    } catch (e) {
      dispatch(filtersError(e));
    }
  };
};
export const fetchLanguageList = () => {
  return async (dispatch) => {
    try {
      const languages = await fetchLanguages();
      dispatch(addLanguages(languages));
    } catch (e) {
      dispatch(filtersError(e));
    }
  };
};
