import axios from "axios";

const genresRequest = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "0a8c012b7257aed83fb6a779018b72d0",
  },
});

export const fetchGenres = async () => {
  return await genresRequest
    .get("/genre/movie/list")
    .then((res) => res.data.genres);
};

export const fetchLanguages = async () => {
  return await genresRequest
    .get("/configuration/languages")
    .then((res) => res.data);
};
