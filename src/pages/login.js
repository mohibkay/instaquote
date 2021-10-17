import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { ROUTES, CREDENTIALS } from "../constants";
import Header from "../components/Header";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isInvalid = password === "" || email === "";

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    login(email, password);
  };

  const handleGuestLogin = async () => {
    setEmail(CREDENTIALS.email);
    setPassword(CREDENTIALS.password);
    login(CREDENTIALS.email, CREDENTIALS.password);
  };

  useEffect(() => {
    document.title = "Login - InstaQuote";
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
        <div className="flex flex-col w-full md:w-2/5">
          <div className="flex flex-col bg-white py-2 border border-gray-primary mb-4">
            <h1 className="flex justify-center w-full p-4">InstaQuote</h1>

            {error && (
              <p className="text-xs mb-4 text-red-primary px-4">{error}</p>
            )}

            <form
              onSubmit={handleLogin}
              className="flex flex-col items-center px-4"
            >
              <input
                type="email"
                aria-label="Enter email address"
                placeholder="Email address"
                className="px-2 py-0.5 mb-2 border w-full border-gray-primary focus:outline-none rounded"
                onChange={({ target }) => setEmail(target.value)}
                value={email}
              />

              <input
                type="password"
                aria-label="Enter password"
                placeholder="Password"
                className="px-2 py-0.5 mb-2 border w-full border-gray-primary focus:outline-none rounded"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />

              <button
                disabled={isInvalid || isLoading}
                type="submit"
                className={`bg-blue-medium text-white w-full rounded h-8 py-1 mb-4 ${
                  isInvalid && "opacity-50"
                }`}
              >
                Login
              </button>
            </form>
            <button
              disabled={isLoading}
              onClick={handleGuestLogin}
              className="border w-11/12 mx-auto rounded py-0.5"
            >
              Guest Login
            </button>
          </div>

          <div className="flex justify-center bg-white border border-gray-primary">
            <p className="py-1">
              Don't have an account?{" "}
              <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
