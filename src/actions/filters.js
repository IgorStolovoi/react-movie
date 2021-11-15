export const ADD_FILTER = "Add-Filter";
export const addFilter = (filter) => ({
  type: ADD_FILTER,
  payload: filter,
});
////////////////////////////////
export const ADD_PAGES = "Add-Pages";
export const addPages = (totalPages) => ({
  type: ADD_PAGES,
  payload: totalPages,
});
////////////////////////////////
export const CHANGE_PAGE = "Change-Page";
export const changePage = (page) => ({
  type: CHANGE_PAGE,
  payload: page,
});
/////////////////////////////////
export const ADD_GENRES_LIST = "Add-Genres-List";
export const addGenres = (genres) => ({
  type: ADD_GENRES_LIST,
  payload: genres,
});
/////////////////////////////////
export const ADD_LANGUAGE_LIST = "Add-Language-List";
export const addLanguages = (languages) => ({
  type: ADD_LANGUAGE_LIST,
  payload: languages,
});
/////////////////////////////////
export const GENERATE_QUERY = "Search-Movies";
export const generateQuery = () => ({
  type: GENERATE_QUERY,
});
/////////////////////////////////
export const FILTERS_ERROR = "Filters-Error";
export const filtersError = (err) => ({
  type: FILTERS_ERROR,
  payload: err,
});
