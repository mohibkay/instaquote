import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DeleteModal from "../utils/DeleteModal";
import MenuList from "../utils/Menu";

export default function Header({ username, handleDeletePost, docId }) {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [editModalStatus, setEditModalStatus] = useState(false);

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

      {/* <button onClick={() => handleDeletePost(docId)}>del</button> */}
      <MenuList
        setModalStatus={setDeleteModalStatus}
        setShowEditModal={"setShowEditModal"}
        type={100}
      />

      <DeleteModal
        modalStatus={deleteModalStatus}
        setModalStatus={setDeleteModalStatus}
        handleDeletePost={handleDeletePost}
        postId={docId}
        title={"project"}
      />
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
