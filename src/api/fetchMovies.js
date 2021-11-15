import axios from "axios";
const API_KEY = "0a8c012b7257aed83fb6a779018b72d0";
const filmsRequest = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchMovies = async (searchParams) => {
  const res = await filmsRequest.get(
    `/discover/movie?api_key=${API_KEY}&${searchParams}`
  );
  return res;
};

export const fetchMovieInfo = async (id, language) => {
  const res = await filmsRequest
    .get(`/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language,
        append_to_response: "similar",
      },
    })
    .then((res) => res.data);
  return res;
};

export const fetchSearchMovie = async (searchString) => {
  const res = await filmsRequest
    .get(`search/movie?api_key=${API_KEY}&query=${searchString}`)
    .then((response) => response.data);
  return res;
};
