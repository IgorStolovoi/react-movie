import React, { useEffect } from "react";
import { Input } from "../UI/Input";
import FormButton from "../UI/FormButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaForLogin } from "../../utils/validationSchema";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { useState } from "react";
import { Typography } from "@mui/material";
import * as auth from "../../api/auth";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../thunks/user";
import { useCallback } from "react";
function LoginForm() {
  const [formState, setFormState] = useState({
    userName: "",
    password: "",
  });
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaForLogin),
  });

  const generateRequestToken = async () => {
    const requestToken = await auth.getToken();
    window.open(
      `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/login`
    );
  };

  const generateSession = useCallback(
    async (token) => {
      await auth.getSessionId(token).then((id) => {
        localStorage.setItem("session_id", id);
        dispatch(fetchUserInfo(id));
        navigate("/movies");
      });
    },
    [dispatch, navigate]
  );
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/movies");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const requestToken = [
      searchParams.get("request_token"),
      searchParams.get("approved"),
    ];
    if (requestToken[1]) {
      generateSession(requestToken[0]);
    }
  }, [generateSession, searchParams]);

  function onSubmit() {
    generateRequestToken();
  }

  function onTextInput(e) {
    setFormState((prop) => ({ ...prop, [e.target.name]: e.target.value }));
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            maxWidth: "300px",
            textAlign: "center",
            p: 5,
            borderRadius: "5px",
            border: "1px solid #000",
          }}
        >
          <Input
            {...register("userName", {
              onChange: onTextInput,
            })}
            label="First Name"
            error={!!errors.userName}
            helperText={errors?.userName?.message}
            value={formState.userName}
          />
          <Input
            {...register("password", {
              onChange: onTextInput,
            })}
            type="password"
            label="Password"
            error={!!errors.password}
            helperText={errors?.password?.message}
            value={formState.password}
          />
          <FormButton disabled={!isValid} type="submit">
            Login
          </FormButton>
        </Box>
      </form>
    </Box>
  );
}

export default LoginForm;
