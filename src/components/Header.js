import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import { ROUTES } from "../constants";

const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const history = useHistory();

  const handleSignOut = () => {
    firebase.auth().signOut();
    history.push(ROUTES.LOGIN);
  };

  return (
    <header className="h-14 bg-white border-b border-gray-primary mb-8 sticky top-0 z-20">
      <div className="container max-w-screen-lg mx-auto h-full">
        <div className="flex justify-between h-full px-4 md:px-0">
          <div className="flex items-center text-center text-gray-700 cursor-pointer">
            <h1 className="flex justify-center w-full font-bold text-xl">
              <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                InstaQuote
              </Link>
            </h1>
          </div>

          <div className="flex items-center text-center text-gray-700 space-x-4">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-black-light"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>

                <button
                  type="button"
                  title="Sign Out"
                  onClick={handleSignOut}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSignOut();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-black-light"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>

                <Link to={`/p/${user.displayName}`} className="font-semibold">
                  {user.displayName}
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium text-white pb-1 text-sm w-20 h-8 rounded font-bold border hover:bg-white hover:text-blue-medium"
                  >
                    Log In
                  </button>
                </Link>

                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="text-blue-medium font-bold pb-1 text-sm rounded w-20 h-8 border hover:bg-blue-medium hover:text-white"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
