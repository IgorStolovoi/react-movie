import React from "react";
import Tab from "@mui/material/Tab";
import { NavLink } from "react-router-dom";

function LinkTab(props) {
  return <Tab component={NavLink} {...props} />;
}

export default LinkTab;
