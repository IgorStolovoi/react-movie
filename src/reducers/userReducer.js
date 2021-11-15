import { LOG_IN, LOG_IN_ERROR, LOG_OUT, CHECK_USER } from "../actions/user";

const initialState = {
  userInfo: {},
  isLoggedIn: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        userInfo: action.payload,
        isLoggedIn: true,
      };
    case LOG_OUT:
      return {
        ...initialState,
      };
    case LOG_IN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CHECK_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};
