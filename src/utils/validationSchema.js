import * as yup from "../../node_modules/yup";

export const schemaForRegister = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(
      /^[a-z\u0400-\u04FF]{1,12}$/i,
      "First name must contain only letters"
    ),
  lastName: yup
    .string()
    .required("Second name is required")
    .matches(
      /^[a-z\u0400-\u04FF]{1,12}$/i,
      "Second name must contain only letters"
    ),
  email: yup.string().required("Email is required").email("Invalid email"),
  userName: yup
    .string()
    .required("Username is required")
    .matches(
      /^([a-z]+[._0-9A-Za-z]*)$/g,
      "User name should start from small letter, and contains letters, digits, . or _"
    ),
  password: yup.string().required("Password is required"),
  retypedPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password")], "Passwords must be equal"),
  selectedGender: yup.string().required("Gender is required"),
});

export const schemaForLogin = yup.object().shape({
  userName: yup.string().required(),
  password: yup.string().required(),
});
