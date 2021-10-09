import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header({ username, fullName }) {
  return (
    <div className="flex border-b border-gray-primary h-4 px-4 py-5">
      <Link to={`/p/${username}`} className="flex items-center space-x-4">
        {/* <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username} profile`}
          className="rounded-full w-8 h-8"
        /> */}

        <div className="uppercase bg-blue-medium inline-block h-8 w-8 text-center px-2 rounded-full text-xl text-white font-bold ml-2">
          {"fullName"?.[0]}
        </div>
        <p className="font-bold">{username}</p>
      </Link>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
