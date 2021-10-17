import { useReducer, useEffect } from "react";
import Header from "./Header";
import Posts from "./Posts";
import PropTypes from "prop-types";
import { getUserPostsByUserId } from "../../services/firebase";
import useUser from "../../customHooks/useUser";

export default function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    postsCollection: [],
    followerCount: 0,
  };
  const [{ profile, postsCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPosts() {
      const photos = await getUserPostsByUserId(user.userId);
      dispatch({
        profile: user,
        postsCollection: photos,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndPosts();
  }, [user]);

  const {
    user: { username: currentUser },
  } = useUser();

  return (
    <>
      <Header
        photosCount={postsCollection ? postsCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Posts
        postsCollection={postsCollection}
        username={user.username}
        currentUser={currentUser}
      />
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
