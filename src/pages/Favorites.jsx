import React, { useState, useEffect, useCallback } from "react";
import { fetchFavoriteList } from "../api/fetchFavorites";
import MoviesList from "../components/MoviesList/MoviesList";
import noPhoto from "../assets/img/no_poster.jpg";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../actions/user";
import { Typography } from "@mui/material";
function Favorites() {
  const [favorites, setFavorites] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getFavoritesMemo = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const session = localStorage.getItem("session_id");
      await fetchFavoriteList(page, session).then((res) => {
        const favoritesWithImg = res.results.map((movie) => {
          return {
            ...movie,
            correctImg: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : noPhoto,
          };
        });
        setFavorites({ ...res, results: favoritesWithImg });
        setIsLoading(false);
      });
    } catch (e) {
      setFavorites({});
      setIsLoading(false);
      setError(e);
    }
  }, [page]);

  useEffect(() => {
    if (!isLoggedIn) dispatch(checkUser());
  }, [isLoggedIn, dispatch]);
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Favorite Movies List
      </Typography>
      <MoviesList
        moviesList={favorites.results}
        fetchMoviesList={getFavoritesMemo}
        err={error}
        totalPages={favorites.total_pages}
        currentPage={page}
        changePage={setPage}
        loadingStatus={isLoading}
      />
    </>
  );
}

export default Favorites;
