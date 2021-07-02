import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { ROUTES } from "../constants";
import { doesUserNameExist } from "../services/firebase";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  const handleSignup = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUserNameExist(username);

    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          email: email.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setUsername("");
        setFullName("");
        setEmail("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setError("Username already taken! Please try another.");
    }
  };

  useEffect(() => {
    document.title = "Signup - Pixygram";
  }, []);

  return (
    <div className="container flex space-x-8 mx-auto max-w-screen-md items-center h-screen">
      <div className="md:flex w-3/5">
        <img src="/images/hero.svg" alt="a group selfie" />
      </div>
      <div className="flex flex-col w-full md:w-2/5">
        <div className="flex flex-col bg-white py-2 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full p-4 m-2">Pixygram</h1>

          {error && (
            <p className="text-xs mb-4 text-red-primary px-4">{error}</p>
          )}

          <form
            onSubmit={handleSignup}
            className="flex flex-col items-center px-4"
          >
            <input
              type="text"
              aria-label="Enter username"
              placeholder="Username"
              className="px-2 py-0.5 mb-2 border w-full border-gray-primary focus:outline-none rounded"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />

            <input
              type="text"
              aria-label="Enter Full Name"
              placeholder="Full Name"
              className="px-2 py-0.5 mb-2 border w-full border-gray-primary focus:outline-none rounded"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />

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
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded py-1 mb-4 ${
                isInvalid && "opacity-50"
              }`}
            >
              Signup
            </button>
          </form>
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
  );
}
