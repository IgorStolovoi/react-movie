import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "../MovieCard/MovieCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loader from "../Loaders/Loader";
import PropTypes from "prop-types";
import Error from "../Error/Error";
function MoviesList({
  moviesList,
  fetchMoviesList,
  searchString,
  err,
  totalPages,
  currentPage,
  changePage,
  loadingStatus,
}) {
  useEffect(() => {
    fetchMoviesList(searchString);
  }, [searchString, fetchMoviesList]);

  const onPageChange = (_, value) => {
    changePage(value);
  };
  return (
    <>
      <Grid container spacing={3} mb={2} justifyContent="center">
        {loadingStatus ? (
          <Loader />
        ) : err?.message ? (
          <Error text={err.message} />
        ) : (
          <Grid container spacing={2} p={5} mb={2} flexGrow={1}>
            {moviesList.map((movie) => {
              return (
                <Grid key={movie.id} item xs={6} md={3}>
                  <MovieCard movieInfo={movie} />
                </Grid>
              );
            })}
          </Grid>
        )}
        <Grid item>
          {totalPages ? (
            <Stack spacing={2}>
              <Pagination
                sx={{ margin: "0 auto" }}
                count={+totalPages}
                page={currentPage}
                onChange={onPageChange}
              />
            </Stack>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </>
  );
}
MoviesList.propTypes = {
  moviesList: PropTypes.array,
  fetchMoviesList: PropTypes.func,
  searchString: PropTypes.string,
  currentPage: PropTypes.number,
  changePage: PropTypes.func,
  loadingStatus: PropTypes.bool,
};

MoviesList.defaultProps = {
  moviesList: [],
  totalPages: 0,
};
export default MoviesList;
