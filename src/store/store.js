import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../reducers";
import { LOG_IN, LOG_OUT } from "../actions/user";
import thunk from "redux-thunk";
import { fetchUserInfo } from "../thunks/user";
const userMiddleware = (store) => (next) => async (action) => {
  if (
    action.type !== LOG_IN &&
    !store.getState().user.isLoggedIn &&
    action.type !== LOG_OUT &&
    localStorage.getItem("session_id")
  ) {
    try {
      const sessionId = localStorage.getItem("session_id");
      store.dispatch(fetchUserInfo(sessionId));
    } catch {
      localStorage.removeItem("session_id");
    }
  }
  if (action.type === LOG_OUT) {
    localStorage.removeItem("session_id");
  }
  next(action);
};
const middlewares = [thunk, userMiddleware];
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
