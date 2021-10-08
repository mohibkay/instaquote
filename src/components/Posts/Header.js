import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header({ username }) {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <Link to={`/p/${username}`} className="flex items-center space-x-4">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username} profile`}
          className="rounded-full w-8 h-8"
        />
        <p className="font-bold">{username}</p>
      </Link>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
