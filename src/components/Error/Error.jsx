import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "../../actions/user";
function Error({ text }) {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoggedIn) dispatch(checkUser());
  }, [dispatch, isLoggedIn]);
  return (
    <Typography
      variant="h4"
      color="error"
      sx={{
        textAlign: "center",
        border: "1px solid red",
        p: 2,
        borderRadius: "5px",
      }}
    >
      {text ? text : "404 Error.Something went wrong"}
    </Typography>
  );
}

export default Error;
