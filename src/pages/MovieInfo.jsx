import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieInfo } from "../api/fetchMovies";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "../actions/user";
import Loader from "../components/Loaders/Loader";
import MovieMainDetail from "../components/MovieDetail/MovieMainDetail";
import SimilarMovieList from "../components/MovieDetail/SimilarMovieList";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { getCorrectImg } from "../utils/getCorrectImg";
import Error from "../components/Error/Error";
import { useCallback } from "react";
function MovieInfo() {
  const { id } = useParams();
  const { language } = useSelector((state) => state.moviesFilters.filters);
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getMoviesInfoMemo = useCallback(
    async (lang) => {
      try {
        setIsLoading(true);
        setError(null);
        await fetchMovieInfo(id, lang).then((res) => {
          const withImg = {
            backdrop_path: getCorrectImg(res.backdrop_path),
            poster_path: getCorrectImg(res.poster_path),
          };
          setMovieInfo({ ...res, ...withImg });
          setIsLoading(false);
        });
      } catch (e) {
        setMovieInfo({});
        setIsLoading(false);
        setError(e);
      }
    },
    [id]
  );
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(checkUser());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    getMoviesInfoMemo(language);
  }, [id, language, getMoviesInfoMemo]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error text={error.message} />
      ) : (
        <Grid container direction="column">
          <Grid item mb={4} mt={3.5} sx={{ maxWidth: "100%" }}>
            <MovieMainDetail movieInfo={movieInfo} id={id} />
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item xs={6} md={9} ml={2}>
                <SimilarMovieList similarMovies={movieInfo.similar} />
              </Grid>
              <Grid item md={2} ml={1}>
                <Typography variant="h5" component="h4" mb={2}>
                  Additional Info
                </Typography>
                <Stack
                  direction="column"
                  divider={<Divider orientation="horizontal" flexItem />}
                  spacing={2}
                >
                  <Box>
                    <Typography variant="p" component="h4">
                      Runtime : {movieInfo.runtime} min
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="p" component="h4">
                      Budget: {movieInfo.budget} $
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="p" component="h4">
                      Revenue: {movieInfo.revenue} $
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default MovieInfo;
