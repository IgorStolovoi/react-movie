import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as key } from "uuid";
function SimilarMovieList({ similarMovies }) {
  const navigate = useNavigate();
  let movieImg = similarMovies.results.map((el) => ({
    ...el,
    poster_path: `https://image.tmdb.org/t/p/w500${el.poster_path}`,
  }));
  return (
    <>
      <Typography variant="h5" component="h4">
        List of similar movies
      </Typography>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          overflowY: "hidden",
          overflowX: "scroll",
          maxWidth: "1100px",
          width: "100%",
        }}
      >
        {movieImg.map((mov) => {
          return (
            <Card sx={{ minWidth: 145, height: 200, m: 2 }} key={key()}>
              <CardActionArea
                onClick={() => {
                  navigate(`/movie/${mov.id}`);
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={mov.poster_path}
                />
                <CardContent>
                  <Typography gutterBottom variant="p" component="div">
                    {mov.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </>
  );
}

export default SimilarMovieList;
