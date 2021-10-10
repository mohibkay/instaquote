import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DeleteModal from "../utils/DeleteModal";
import MenuList from "../utils/Menu";
import EditModal from "../utils/EditModal";

export default function Header({
  username,
  docId,
  caption,
  handleDeletePost,
  handleUpdatePost,
}) {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [editModalStatus, setEditModalStatus] = useState(false);
  const [post, setPost] = useState(caption);

  return (
    <div className="flex justify-between items-start border-gray-primary h-4 px-3 py-5 pt-7">
      <Link to={`/p/${username}`} className="flex items-center space-x-4">
        {/* <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username} profile`}
          className="rounded-full w-8 h-8"
        /> */}

        <div className="uppercase bg-blue-medium h-6 w-6 text-center px-2 rounded-full text-sm text-white font-bold ml-2 flex justify-center items-center">
          <p>{username?.[0]}</p>
        </div>
        <p className="font-bold">{username}</p>
      </Link>

      <MenuList
        setModalStatus={setDeleteModalStatus}
        setShowEditModal={setEditModalStatus}
      />

      <DeleteModal
        modalStatus={deleteModalStatus}
        setModalStatus={setDeleteModalStatus}
        handleDeletePost={handleDeletePost}
        postId={docId}
        title={"post"}
      />

      <EditModal
        post={post}
        setPost={setPost}
        postId={docId}
        modalStatus={editModalStatus}
        setModalStatus={setEditModalStatus}
        handleUpdate={handleUpdatePost}
      />
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
