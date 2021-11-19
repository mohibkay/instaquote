import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useUser from "../../customHooks/useUser";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";

const Header = ({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    username: profileUsername,
    fullName,
    followers = [],
    following = [],
  },
}) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const activeFollowBtn = user?.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsLoading(true);
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });

    try {
      await toggleFollow(
        isFollowingProfile,
        user.docId,
        profileUserId,
        profileDocId,
        user.userId
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      try {
        setIsLoading(true);
        const isFollowing = await isUserFollowingProfile(
          user.username,
          profileUserId
        );

        setIsFollowingProfile(isFollowing);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [profileUserId, user.username]);

  return (
    <div className="grid grid-cols-3 justify-between">
      <div className="container flex justify-center">
        {!profileUsername ? (
          <div className="rounded-full h-20 w-20 md:h-24 md:w-24 bg-gray-primary" />
        ) : (
          <div className="uppercase bg-blue-medium h-20 w-20 md:h-24 md:w-24 text-center px-2 rounded-full text-5xl text-white font-bold flex justify-center items-center">
            <p>{profileUsername?.[0]}</p>
          </div>
        )}
      </div>

      <div className="col-span-2">
        {!profileUsername ? (
          <Skeleton count={1} width={477} height={130} />
        ) : (
          <>
            <div className="flex space-x-5 items-center">
              <h2 className="text-3xl text-black-light">{profileUsername}</h2>
              {activeFollowBtn && (
                <button
                  type="button"
                  onClick={handleToggleFollow}
                  className="bg-blue-medium w-20 h-8 text-white font-semibold px-2 py-0.5 rounded"
                >
                  {isLoading
                    ? "Loading..."
                    : isFollowingProfile
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}
            </div>
            <div className="grid grid-cols-5 mt-5 mb-4">
              <p className="col-span-1">
                <span className="font-bold mr-2">{photosCount}</span> quotes
              </p>
              <p className="col-span-1">
                <span className="font-bold mr-2">{followerCount}</span>{" "}
                {followerCount === 1 ? "follower" : "followers"}
              </p>
              <p className="col-span-1">
                <span className="font-bold mr-2">{following.length - 1}</span>{" "}
                following
              </p>
            </div>
            <p className="font-semibold text-xl">{fullName} </p>
          </>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    userId: PropTypes.string,
    fullName: PropTypes.string,
    profileUsername: PropTypes.string,
    docId: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
  }),
};

export default Header;
