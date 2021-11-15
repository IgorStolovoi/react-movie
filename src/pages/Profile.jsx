import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCorrectImg } from "../utils/getCorrectImg";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { logOut } from "../actions/user";
import { v4 as key } from "uuid";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../actions/user";
function Profile() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  useEffect(() => {
    if (!isLoggedIn) dispatch(checkUser());
  }, [dispatch, isLoggedIn]);
  return (
    <>
      {isLoggedIn ? (
        <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
          <CardMedia
            component="img"
            height="240"
            image={getCorrectImg(userInfo.avatar.tmdb.avatar_path)}
            alt="avatar"
          />
          <CardContent>
            <List>
              <ListItem key={key()} secondaryAction={<p>{userInfo.name}</p>}>
                <ListItemText primary="Name" />
              </ListItem>
              <Divider />
              <ListItem
                key={key()}
                secondaryAction={<p>{userInfo.username}</p>}
              >
                <ListItemText primary="UserName" />
              </ListItem>
              <Divider />
            </List>
          </CardContent>
          <CardActions>
            <Button size="small" sx={{ margin: "0 auto" }} onClick={logout}>
              Logout
            </Button>
          </CardActions>
        </Card>
      ) : (
        ""
      )}
    </>
  );
}

export default Profile;
