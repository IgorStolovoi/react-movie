import React, { useState } from "react";
import ThemeSwitch from "../UI/Switch";
import Search from "../Search/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logOut } from "../../actions/user";
import { useLocation } from "react-router-dom";
import LinkTab from "./LinkTab";
import { v4 as key } from "uuid";
function Header() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const [value, setValue] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!localStorage.getItem("session_id")) {
      dispatch(logOut());
    }
  }, [dispatch, isLoggedIn, location]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ThemeSwitch />
            <Tabs value={value} onChange={handleChange}>
              <Search />
              <LinkTab label="Movies" to="/movies" key={key()} />
              <LinkTab label="Favorites" to="/favorites" key={key()} />
              {isLoggedIn ? (
                <LinkTab label="Profile" to="/profile" key={key()} />
              ) : (
                [
                  <LinkTab
                    label="Registration"
                    to="/registration"
                    key={key()}
                  />,
                  <LinkTab label="Login" to="/login" key={key()} />,
                ]
              )}
            </Tabs>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
