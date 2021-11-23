import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

// Components
import Header from "../components/Header";
import TextError from "../components/utils/TextError";

// Context
import FirebaseContext from "../context/firebase";

// Utilities
import { doesUserNameExist } from "../services/firebase";

import {
  ROUTES,
  signUpInitialValues,
  signUpValidationSchema,
} from "../constants";

const Login: React.FC = () => {
  const history = useHistory();
  // @ts-ignore TODO: fix user context types

  const { firebase } = useContext(FirebaseContext);

  // const [username, setUsername] = useState("");
  // const [fullName, setFullName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const onSubmit = (values: any) => {
  //   console.log("values");
  //   console.log(values);
  // };

  const onSubmit = async (values: any, actions: any) => {
    console.log("actions");
    console.log(actions);
    const { username, email, password, fullName } = values;
    setError("");
    const usernameExists = await doesUserNameExist(username);

    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebase
          .firestore()
          .collection("users")
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            email: email.toLowerCase(),
            following: [createdUserResult.user.uid],
            followers: [],
            dateCreated: Date.now(),
          });

        history.push(ROUTES.DASHBOARD);
      } catch (error: any) {
        setError(error.message);
      } finally {
        actions.setSubmitting(false);
        actions.resetForm();
      }
    } else {
      setError("Username already taken! Please try another.");
    }
  };

  useEffect(() => {
    document.title = "Signup - InstaQuote";
  }, []);

  return (
    <div className="m-0 p-0">
      <Header />
      <div
        className="flex flex-col md:flex-row space-x-8 w-11/12 md:mx-auto max-w-screen-md items-center"
        style={{ height: "calc(100vh - 70px)" }}
      >
        <div className="mb-8 md:mb-0 md:flex md:w-3/5">
          <img
            src="/images/heroMobile.svg"
            alt="post"
            className="h-48 md:h-72"
          />
        </div>
        <div className="flex flex-col w-full mx-auto md:w-2/5">
          <div className="flex flex-col bg-white py-2 border border-gray-primary mb-4">
            <h1 className="flex justify-center w-full p-4 m-2 font-semibold text-xl">
              InstaQuote
            </h1>

            {error && (
              <p className="text-xs mb-4 text-red-primary px-4">{error}</p>
            )}

            <Formik
              initialValues={signUpInitialValues}
              onSubmit={onSubmit}
              validationSchema={signUpValidationSchema}
            >
              {(formik) => {
                console.log("formik");
                console.log(formik);
                return (
                  <Form
                    // onSubmit={handleSignup}
                    className="flex flex-col items-center px-4"
                  >
                    <div className="w-full">
                      <Field
                        type="text"
                        name="username"
                        aria-label="Enter username"
                        placeholder="Username"
                        className="px-2 py-0.5 mb-2 border w-full border-gray-primary focus:outline-none rounded"
                      />
                      {/* @ts-ignore TODO: fix type */}
                      <ErrorMessage name="username" component={TextError} />
                    </div>

                    <div className="w-full">
                      <Field
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className="px-2 py-0.5 mb-2 border w-full border-gray-primary focus:outline-none rounded"
                      />
                      {/* @ts-ignore */}
                      <ErrorMessage name="fullName" component={TextError} />
                    </div>

                    <div className="w-full">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="px-2 py-0.5 mb-2 border w-full border-gray-primary focus:outline-none rounded"
                      />
                      {/* @ts-ignore */}
                      <ErrorMessage name="email" component={TextError} />
                    </div>

                    <div className="w-full">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="px-2 py-0.5 mb-2 border w-full border-gray-primary focus:outline-none rounded"
                      />
                      {/* @ts-ignore */}
                      <ErrorMessage name="password" component={TextError} />
                    </div>

                    <button
                      // disabled={isInvalid}
                      type="submit"
                      className={`bg-blue-medium text-white w-full rounded py-1 mb-4 ${
                        formik.isSubmitting && "opacity-75 cursor-not-allowed"
                      }`}
                    >
                      {formik.isSubmitting ? "Signing up..." : "Signup"}
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>

          <div className="flex justify-center bg-white border border-gray-primary">
            <p className="py-1">
              Already have an account?{" "}
              <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
