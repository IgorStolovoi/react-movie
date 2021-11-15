import React from "react";
import { Input } from "../UI/Input";
import FormButton from "../UI/FormButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaForRegister } from "../../utils/validationSchema";
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDayjs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { v4 as key } from "uuid";
import { useNavigate } from "react-router";
function RegistrationForm() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    dateOfBirth: null,
    password: "",
    retypedPassword: "",
    gender: ["Female", "Male", "Other"],
    selectedGender: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaForRegister),
  });
  function onSubmit() {
    navigate("/login");
  }
  function onTextInput(e) {
    setFormState((prop) => ({ ...prop, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Registration Form
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "350px",
              border: "1px solid darkblue",
              borderRadius: "5px",
              p: 3,
            }}
          >
            <Input
              {...register("firstName", {
                onChange: onTextInput,
              })}
              label="First Name"
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
              value={formState.firstName}
            />
            <Input
              {...register("lastName", {
                onChange: onTextInput,
              })}
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
              value={formState.lastName}
            />
            <Input
              {...register("email", {
                onChange: onTextInput,
              })}
              label="Email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              value={formState.email}
            />
            <Input
              {...register("userName", {
                onChange: onTextInput,
              })}
              label="Username"
              error={!!errors.userName}
              helperText={errors?.userName?.message}
              value={formState.userName}
            />
            <Input
              {...register("password", {
                onChange: onTextInput,
              })}
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              value={formState.password}
            />
            <Input
              {...register("retypedPassword", {
                onChange: onTextInput,
              })}
              label="Retype Password"
              type="password"
              error={!!errors.retypedPassword}
              helperText={errors?.retypedPassword?.message}
              value={formState.retypedPassword}
            />

            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                value={formState.selectedGender}
                row
                onChange={onTextInput}
              >
                {formState.gender.map((g) => (
                  <FormControlLabel
                    key={key()}
                    value={g}
                    {...register("selectedGender")}
                    control={<Radio />}
                    label={g}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                disableFuture
                label="Date of birth"
                value={formState.dateOfBirth}
                onChange={(newValue) => {
                  setFormState((prop) => ({ ...prop, dateOfBirth: newValue }));
                }}
                renderInput={(params) => {
                  return (
                    <Input
                      {...params}
                      required
                      helperText={params.error && "Invalid Data"}
                    />
                  );
                }}
              />
            </LocalizationProvider>
            <FormButton
              disabled={!(isValid && Date.parse(formState.dateOfBirth?.$d))}
              type="submit"
            >
              Registration
            </FormButton>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default RegistrationForm;
