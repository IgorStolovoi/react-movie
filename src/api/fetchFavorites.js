import axios from "axios";
const API_KEY = "0a8c012b7257aed83fb6a779018b72d0";
const accountId = "11366692";

const favoritesListRequest = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
  },
});

export const fetchFavoritesStatus = async (movieId, status, session) => {
  return await favoritesListRequest.post(
    `/account/${accountId}/favorite`,
    {
      media_type: "movie",
      media_id: movieId,
      favorite: status,
    },
    {
      params: {
        session_id: session,
      },
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const fetchMovieStatus = async (movieId, session) => {
  return await favoritesListRequest
    .get(`/movie/${movieId}/account_states`, {
      params: { session_id: session },
    })
    .then((res) => res.data.favorite);
};

export const fetchFavoriteList = async (page, session) => {
  return await favoritesListRequest
    .get(`/account/${accountId}/favorite/movies`, {
      params: { page, session_id: session },
    })
    .then((res) => res.data);
};
