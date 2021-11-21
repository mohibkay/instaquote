import * as Yup from "yup";

export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  SIGN_UP: "/signup",
  PROFILE: "/p/:username",
  NOT_FOUND: "*",
};

export const CREDENTIALS = {
  email: "mohibk.in@gmail.com",
  password: "falconnine",
};

export const signUpValidationSchema = Yup.object({
  username: Yup.string().required("Username is missing"),
  fullName: Yup.string().required("Fullname is missing"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is missing"),
  password: Yup.string().required("Password is missing"),
});

export const signUpInitialValues = {
  username: "",
  fullName: "",
  email: "",
  password: "",
};
