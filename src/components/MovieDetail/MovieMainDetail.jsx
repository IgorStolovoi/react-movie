import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  fetchMovieStatus,
  fetchFavoritesStatus,
} from "../../api/fetchFavorites";
import { pink } from "@mui/material/colors";
import { toast } from "react-toastify";

function MovieMainDetail({ movieInfo, id }) {
  const [favoriteStatus, setFavoriteStatus] = useState(false);

  const changeFavoriteStatus = async (id) => {
    try {
      const session = localStorage.getItem("session_id");
      const status = await fetchMovieStatus(id, session).then((res) => {
        fetchFavoritesStatus(id, !res, session);
        setFavoriteStatus(!res, session);
        return !res;
      });
      toast.success(
        status
          ? `${movieInfo.original_title} is added to favorites list!`
          : `${movieInfo.original_title} is removed from favorites list!`
      );
    } catch (e) {
      toast.error("Some Error with favorite list:CC");
    }
  };
  useEffect(() => {
    const session = localStorage.getItem("session_id");
    fetchMovieStatus(id, session).then((res) => {
      setFavoriteStatus(res);
    });
  }, [id]);

  return (
    <Grid
      container
      alignItems="center"
      spacing={5}
      flexGrow="1"
      p={5}
      sx={{
        background: `url(${movieInfo.backdrop_path || ""})`,
        backgroundPosition: "right bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color: "#fff",
        position: "relative",
        zIndex: "1",
      }}
    >
      <Grid item xs={3} md={3}>
        <CardMedia
          component="img"
          image={movieInfo.poster_path}
          alt="Movie Poster"
          sx={{
            width: "300px",
            margin: "0 auto",
          }}
        />
      </Grid>
      <Grid item xs={4} md={6}>
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
        >
          <Box>
            <Typography variant="h4" component="h4">
              {movieInfo.original_title}
            </Typography>
          </Box>
          <Box>
            <Typography component="legend">
              Rating({movieInfo.vote_count} votes)
            </Typography>
            <Rating
              defaultValue={1}
              max={10}
              precision={0.1}
              readOnly
              value={movieInfo.vote_average}
            />
          </Box>
          <Box>
            Genres: {movieInfo.genres.map((genre) => genre.name).join()}
          </Box>
          <Box>Release Date: {movieInfo.release_date}</Box>
          <Box>{movieInfo.overview}</Box>
          <Box>
            <IconButton
              onClick={() => {
                changeFavoriteStatus(movieInfo.id);
              }}
            >
              <FavoriteIcon
                sx={{ color: `${favoriteStatus ? pink[500] : "#fff"}` }}
              />
            </IconButton>
            {favoriteStatus ? "Remove from favorite" : "Add to Favorite"}
          </Box>
        </Stack>
      </Grid>
      <Box
        sx={{
          position: "absolute",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          backgroundImage:
            "linear-gradient(259deg,rgba(2, 0, 36, 1) 0%,rgba(99, 77, 77, 1) 100%,rgba(0, 212, 255, 1) 100%)",
          zIndex: "-1",
          opacity: "0.7",
        }}
      />
    </Grid>
  );
}

export default MovieMainDetail;
