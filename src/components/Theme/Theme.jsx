import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { light, dark } from "../../theme";
import CssBaseline from "@mui/material/CssBaseline";
function Theme({ children }) {
  const { isLightTheme } = useSelector((state) => state.theme);
  const appliedTheme = createTheme(isLightTheme ? light : dark);
  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline>{children}</CssBaseline>
    </ThemeProvider>
  );
}

export default Theme;
