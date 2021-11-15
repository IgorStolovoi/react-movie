import { ADD_MOVIES, MOVIES_ERROR, IS_LOADING } from "../actions/movies";

const initialState = {
  moviesList: [],
  isLoading: true,
  error: null,
};

export const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        moviesList: [...action.payload],
      };
    case MOVIES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
