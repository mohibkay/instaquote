import { useRef, useState } from "react";
import PropTypes from "prop-types";

// Components
import Header from "./Header";
import Actions from "./Actions";
import Comments from "./Comments";
import Content from "./Content";

export default function Post({
  content,
  currentUser,
  handleDeletePost,
  handleUpdatePost,
}) {
  const {
    username,
    fullName,
    docId,
    caption,
    likes,
    comments,
    loggedInUserLikedPhoto,
    dateCreated,
  } = content;

  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  const [totalComments, setTotalComments] = useState(comments.length);

  return (
    <div className="bg-white border-t border-b md:border border-gray-primary rounded mb-12">
      <Header
        username={username}
        fullName={fullName}
        docId={docId}
        caption={caption}
        currentUser={currentUser}
        handleDeletePost={handleDeletePost}
        handleUpdatePost={handleUpdatePost}
      />
      <Content content={caption} />
      <Actions
        docId={docId}
        totalLikes={likes.length}
        likedPhoto={loggedInUserLikedPhoto}
        handleFocus={handleFocus}
        totalComments={totalComments}
      />
      <Comments
        docId={docId}
        comments={comments}
        posted={dateCreated}
        commentInput={commentInput}
        setTotalComments={setTotalComments}
      />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    loggedInUserLikedPhoto: PropTypes.bool.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
