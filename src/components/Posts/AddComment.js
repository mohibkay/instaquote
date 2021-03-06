import PropTypes from "prop-types";
import { useContext, useState } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
  setTotalComments,
}) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const isInvalid = !comment.trim();

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([{ displayName, comment }, ...comments]);
    setComment("");
    setTotalComments((comments) => comments + 1);

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
          className="w-full text-sm text-gray-base px-4 py-2.5 focus: outline-none"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          type="submit"
          disabled={isInvalid}
          onClick={handleSubmitComment}
          className={`text-sm text-blue-medium font-bold ${
            isInvalid && "opacity-25 cursor-default"
          }`}
        >
          Comment
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
