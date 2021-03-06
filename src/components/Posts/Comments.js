import { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
  setTotalComments,
}) {
  const [comments, setComments] = useState(allComments);

  return (
    <>
      <div className="p-4 pt-0">
        {comments.length > 3 && <p>View all {comments.length} comments</p>}
        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="space-x-1">
            <Link to={`/p/${item.displayName}`} className="font-bold">
              {item.displayName}
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>

      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
        setTotalComments={setTotalComments}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  allComments: PropTypes.string,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
