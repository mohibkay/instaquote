import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import { ROUTES } from "../constants";
import Header from "../components/Header";
import UserProfile from "../components/Profile";
import ReactLoader from "react-loader";

interface User {
  username: string;
  docId: string;
}

interface ParamTypes {
  username: string;
}

const Profile: React.FC = () => {
  const { username } = useParams<ParamTypes>();
  const [user, setUser] = useState({} as User);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      if (user) {
        // @ts-ignore TODO: fix User type
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
        {/* @ts-ignore TODO fix Profile types */}
        <UserProfile user={user} />
      </div>
    </div>
  ) : (
    <ReactLoader loaded />
  );
};

export default Profile;
