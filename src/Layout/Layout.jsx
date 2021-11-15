import React from "react";
import Header from "../components/Header/Header";
import AllRoutes from "../components/Routes/AllRoutes";
import Grid from "@mui/material/Grid";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Box } from "@mui/material";
function Layout() {
  return (
    <Box>
      <Grid container direction="column">
        <Grid item sx={{ marginBottom: "20px" }}>
          <Header />
        </Grid>
        <Grid item flexGrow={1} sx={{ minHeight: "100vh" }}>
          <ToastContainer />
          <AllRoutes />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Layout;
