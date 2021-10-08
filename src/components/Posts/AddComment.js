import PropTypes from "prop-types";
import { useContext, useState } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([{ displayName, comment }, ...comments]);
    setComment("");

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between items-center pr-5"
        onSubmit={(event) =>
          comment.length ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <input
          type="text"
          aria-label="Add a comment"
          className="w-full text-sm text-gray-base p-4 focus: outline-none"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          type="submit"
          disabled={!comment}
          onClick={handleSubmitComment}
          className={`text-sm text-blue-medium font-bold ${
            !comment && "opacity-25 cursor-default"
          }`}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
};
