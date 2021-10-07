import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

export default function SuggestedProfile({
  username,
  profileId,
  userId,
  profileDocId,
  loggedInUserDocId,
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);

    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

    await updateFollowedUserFollowers(profileDocId, userId, false);
  }

  return !followed ? (
    <div className="flex justify-between items-center">
      <Link to={`/p/${username}`} className="flex items-center space-x-4">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username} profile`}
          className="h-8 w-8 rounded-full"
        />
        <p className="font-bold text-xs">{username}</p>
      </Link>
      <button
        type="button"
        className="text-blue-medium font-bold"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  username: PropTypes.string,
  profileId: PropTypes.string,
  userId: PropTypes.string,
  profileDocId: PropTypes.string,
  loggedInUserDocId: PropTypes.string,
};
