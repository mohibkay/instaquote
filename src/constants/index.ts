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
  username: Yup.string()
    .required("Username is missing")
    .min(3, "Username should be min 3 chars"),
  fullName: Yup.string()
    .required("Fullname is missing")
    .min(3, "Name should be min 3 chars"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is missing"),
  password: Yup.string()
    .required("Password is missing")
    .min(6, "Password should be min 6 chars"),
});

export const signUpInitialValues = {
  username: "",
  fullName: "",
  email: "",
  password: "",
};
