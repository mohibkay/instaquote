import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

export default function Actions({
  docId,
  totalLikes,
  totalComments,
  likedPhoto,
  handleFocus,
}) {
  const {
    user: { uid: userId },
  } = useContext(UserContext);

  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className="flex justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          <div className="flex justify-between items-center space-x-2">
            <svg
              onClick={handleToggleLiked}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggleLiked();
                }
              }}
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 select-none cursor-pointer focus:outline-none ${
                toggleLiked ? "fill-red text-red-primary" : "text-black-light"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              tabIndex={0}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>

            <span className="pr-6 py-0">
              <p className="font-semibold">{likes}</p>
            </span>
          </div>

          <div className="flex justify-between items-center space-x-2">
            <svg
              onClick={handleFocus}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleFocus();
                }
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 select-none cursor-pointer text-black-light focus:outline-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>

            <span className="pr-6 py-0">
              <p className="font-semibold">{totalComments}</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
};
