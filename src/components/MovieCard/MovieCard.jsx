import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import cls from "./MovieCard.module.scss";
import { useNavigate } from "react-router-dom";
import {
  fetchMovieStatus,
  fetchFavoritesStatus,
} from "../../api/fetchFavorites";
import { toast } from "react-toastify";
function MovieCard({ movieInfo }) {
  const navigate = useNavigate();
  const changeFavoriteStatus = async (id) => {
    try {
      const session = localStorage.getItem("session_id");
      const status = await fetchMovieStatus(id, session).then((res) => {
        fetchFavoritesStatus(id, !res, session);
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

  return (
    <>
      <Card className={cls.card}>
        <CardActionArea
          onClick={() => {
            navigate(`/movie/${movieInfo.id}`);
          }}
        >
          <CardMedia
            component="img"
            image={movieInfo.correctImg}
            className={cls.img}
          />
        </CardActionArea>
        <CardContent sx={{ p: 0 }} className={cls.content}>
          <Button
            className={cls.btn}
            size="small"
            color="info"
            onClick={() => {
              navigate(`/movie/${movieInfo.id}`);
            }}
          >
            {movieInfo.original_title}
          </Button>
          <IconButton
            onClick={() => {
              changeFavoriteStatus(movieInfo.id);
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </CardContent>
      </Card>
    </>
  );
}

export default MovieCard;
