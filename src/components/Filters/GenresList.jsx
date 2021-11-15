import React from "react";
import { Button } from "@mui/material";
import { v4 as key } from "uuid";
function GenresList({ genresList, handleChange, selectedGenres }) {
  return (
    <>
      {genresList.map((genre) => {
        let variant = "outlined";
        if (selectedGenres.split(",").indexOf(`${genre.id}`) !== -1) {
          variant = "contained";
        }
        return (
          <Button
            variant={variant}
            sx={{ m: 0.5 }}
            key={key()}
            name="with_genres"
            value={genre.id}
            onClick={handleChange}
          >
            {genre.name}
          </Button>
        );
      })}
    </>
  );
}

export default React.memo(GenresList);
