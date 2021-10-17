import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import { ROUTES } from "../constants";
import Header from "../components/Header";
import UserProfile from "../components/Profile";
import ReactLoader from "react-loader";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      if (user) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [history, username]);

  useEffect(() => {
    document.title = `${username} - InstaQuote`;
  }, [username]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} loggedInUserLikedPhoto={""} />
      </div>
    </div>
  ) : (
    <ReactLoader />
  );
}
