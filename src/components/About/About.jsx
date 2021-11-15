import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "../../actions/user";
import { Typography } from "@mui/material";
function About() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoggedIn) dispatch(checkUser());
  }, [dispatch, isLoggedIn]);
  return (
    <Typography
      variant="h4"
      sx={{
        textAlign: "center",
        mt: 20,
      }}
    >
      Welcome to my test project on React 😉
    </Typography>
  );
}

export default About;
