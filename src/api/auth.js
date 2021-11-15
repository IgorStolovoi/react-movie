import axios from "axios";

const authRequest = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "0a8c012b7257aed83fb6a779018b72d0",
  },
});

export const getToken = async () => {
  return await authRequest
    .get("/authentication/token/new")
    .then((res) => res.data.request_token);
};

export const getSessionId = async (requestToken) => {
  return await authRequest
    .post("/authentication/session/new", {
      request_token: requestToken,
    })
    .then((res) => res.data.session_id);
};

export const getUser = async (sessionId) => {
  return await authRequest
    .get("/account", {
      params: {
        session_id: sessionId,
      },
    })
    .then((res) => res.data);
};
