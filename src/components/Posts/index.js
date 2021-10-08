import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Image from "./Image";
import Actions from "./Actions";
import Footer from "./Footer";
import Comments from "./Comments";

export default function Post({ content }) {
  const {
    username,
    docId,
    caption,
    imageSrc,
    likes,
    comments,
    loggedInUserLikedPhoto,
    dateCreated,
  } = content;

  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="bg-white border-t border-b md:border border-gray-primary rounded mb-12">
      <Header username={username} />
      <Image src={imageSrc} caption={caption} />
      <Actions
        docId={docId}
        totalLikes={likes.length}
        likedPhoto={loggedInUserLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer username={username} caption={caption} />
      <Comments
        docId={docId}
        comments={comments}
        posted={dateCreated}
        commentInput={commentInput}
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
    imageSrc: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    loggedInUserLikedPhoto: PropTypes.bool.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
