import { getUser } from "../api/auth";
import { logIn, logInError } from "../actions/user";
export const fetchUserInfo = (sessionId) => {
  return async (dispatch) => {
    try {
      const user = await getUser(sessionId);
      dispatch(logIn(user));
    } catch (e) {
      dispatch(logInError(e));
    }
  };
};
