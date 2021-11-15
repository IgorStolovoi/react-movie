import React, { useCallback } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as key } from "uuid";
import { Button } from "@mui/material";
import Slider from "@mui/material/Slider";
import GenresList from "./GenresList";
import PropTypes from "prop-types";
import LanguageList from "./LanguageList";
import { Divider } from "@mui/material";
import Error from "../Error/Error";
function Filters({
  filters,
  addFilter,
  fetchGenresList,
  fetchLanguageList,
  genresList,
  laguageList,
  generateQuery,
  sort_by,
  err,
}) {
  const handleChange = useCallback(
    (e) => {
      if (e.target.name === "with_genres") {
        const genresArr = [...filters.with_genres.split(",")];
        if (genresArr.indexOf(e.target.value) === -1) {
          genresArr.push(e.target.value);
        } else {
          genresArr.splice(genresArr.indexOf(e.target.value), 1);
        }
        return addFilter({
          [e.target.name]: genresArr.join(","),
        });
      }
      if (e.target.name === "average") {
        const votedAverage = {
          "vote_average.gte": e.target.value[0],
          "vote_average.lte": e.target.value[1],
        };
        return addFilter({ [e.target.name]: votedAverage });
      }
      addFilter({ [e.target.name]: e.target.value });
    },
    [filters.with_genres, addFilter]
  );

  const getFiltersList = () => {
    if (!genresList.length && !laguageList.length) {
      fetchGenresList();
      fetchLanguageList();
    }
  };

  const searchByParams = () => {
    generateQuery();
  };

  return (
    <>
      {err ? (
        <Error text="Some Error with Filters" />
      ) : (
        <form>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Sort</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Sort by</Typography>
              <FormControl>
                <Select
                  name="sort_by"
                  value={filters.sort_by}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                >
                  {sort_by.map((sort) => {
                    return (
                      <MenuItem key={key()} value={sort.value}>
                        {sort.text}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion onClick={getFiltersList}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Genre</Typography>
              <GenresList
                genresList={genresList}
                handleChange={handleChange}
                selectedGenres={filters.with_genres}
              />
              <Divider />
              <Typography mt={2}>Language</Typography>
              <LanguageList
                language={filters.language}
                onChange={handleChange}
                laguageList={laguageList}
              />
              <Divider />
              <Typography mt={2}>User Score</Typography>
              <Slider
                value={[
                  filters.average["vote_average.gte"],
                  filters.average["vote_average.lte"],
                ]}
                onChange={handleChange}
                valueLabelDisplay="auto"
                name="average"
                step={1}
                max={10}
              />
              <Divider />
            </AccordionDetails>
          </Accordion>
          <Button
            variant="contained"
            onClick={searchByParams}
            sx={{ mt: 1, width: "100%" }}
          >
            Search
          </Button>
        </form>
      )}
    </>
  );
}
Filters.propTypes = {
  filters: PropTypes.object,
  addFilter: PropTypes.func,
  fetchGenresList: PropTypes.func,
  fetchLanguageList: PropTypes.func,
  genresList: PropTypes.array,
  laguageList: PropTypes.array,
  generateQuery: PropTypes.func,
  sort_by: PropTypes.array,
};
Filters.defaultProps = {
  sort_by: [
    {
      value: "popularity.asc",
      text: "Popularity Ascending",
    },
    {
      value: "popularity.desc",
      text: "Popularity Descending",
    },
    {
      value: "vote_average.asc",
      text: "Rating Ascending",
    },
    {
      value: "vote_average.desc",
      text: "Rating Descending",
    },
  ],
  genresList: [],
};

export default Filters;
