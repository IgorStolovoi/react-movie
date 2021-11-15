import React from "react";
import FiltersContainer from "../components/Filters/FiltersContainer";
import Grid from "@mui/material/Grid";
import MoviesListContainer from "../components/MoviesList/MoviesListContainer";

function Movies() {
  return (
    <Grid container>
      <Grid item xs={3} md={3}>
        <FiltersContainer />
      </Grid>
      <Grid item xs={9} md={9}>
        <MoviesListContainer />
      </Grid>
    </Grid>
  );
}

export default Movies;
