import {
  ADD_FILTER,
  ADD_GENRES_LIST,
  ADD_PAGES,
  CHANGE_PAGE,
  FILTERS_ERROR,
  GENERATE_QUERY,
  ADD_LANGUAGE_LIST,
} from "../actions/filters";
import { getQueryString } from "../utils/getQueryString";
const initialState = {
  filters: {
    sort_by: "popularity.desc",
    with_genres: "",
    language: "en",
    average: { "vote_average.gte": 0, "vote_average.lte": 10 },
    page: 1,
  },
  totalPages: "",
  genresList: [],
  languagesList: [],
  queryString: "",
  isLoading: false,
  error: null,
};
export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GENRES_LIST:
      return {
        ...state,
        genresList: action.payload,
      };
    case ADD_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
          page: 1,
        },
      };
    case ADD_PAGES:
      return {
        ...state,
        filters: {
          ...state.filters,
        },
        totalPages: action.payload.totalPages,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        filters: {
          ...state.filters,
          page: action.payload,
        },
        queryString: getQueryString({ ...state.filters, page: action.payload }),
      };
    case GENERATE_QUERY:
      return {
        ...state,
        queryString: getQueryString({
          ...state.filters,
        }),
      };
    case ADD_LANGUAGE_LIST:
      return {
        ...state,
        languagesList: action.payload,
      };
    case FILTERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
