import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchSearchMovie } from "../../api/fetchMovies";
import { v4 as key } from "uuid";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function Search() {
  const [searchString, setSearchString] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  const searchMovie = async (query) => {
    await fetchSearchMovie(query).then((res) => {
      if (res?.results) {
        setOptions(res.results);
      }
    });
  };

  useEffect(() => {
    if (searchString) {
      setOptions([]);
      searchMovie(searchString);
    }
    return () => {
      setOptions([]);
    };
  }, [searchString]);

  return (
    <Autocomplete
      sx={{ width: 200, p: 0, mr: 2 }}
      freeSolo
      disabled={!isLoggedIn}
      clearOnBlur
      onClose={() => {
        setOptions([]);
      }}
      size="small"
      disableClearable
      getOptionLabel={(option) => option.title}
      options={options.map((option) => option)}
      renderOption={(props, option) => (
        <li
          {...props}
          style={{ padding: "5px" }}
          onClick={() => {
            navigate(`/movie/${option.id}`);
          }}
          key={key()}
        >
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ backgroundColor: "lightblue" }}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          value={searchString}
          label="Search movies ..."
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
