import { combineReducers } from "redux";
import { filmsReducer } from "./filmsReducer";
import { filtersReducer } from "./filtersReducer";
import { themeReducer } from "./themeReducer";
import { userReducer } from "./userReducer";
export const rootReducer = combineReducers({
  movies: filmsReducer,
  moviesFilters: filtersReducer,
  theme: themeReducer,
  user: userReducer,
});
