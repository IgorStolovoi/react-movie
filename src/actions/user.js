export const LOG_IN = "Log-In";
export const logIn = (userInfo) => ({
  type: LOG_IN,
  payload: userInfo,
});
/////////////////////////
export const LOG_OUT = "Log-Out";
export const logOut = () => ({
  type: LOG_OUT,
});
/////////////////////////
export const LOG_IN_ERROR = "Log-In-Error";
export const logInError = (err) => ({
  type: LOG_IN_ERROR,
  payload: err,
});
/////////////////////////
export const CHECK_USER = "Check-User";
export const checkUser = () => ({
  type: CHECK_USER,
});
