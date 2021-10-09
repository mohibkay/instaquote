import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header({ username }) {
  return (
    <div className="flex border-gray-primary h-4 px-3 py-5 pt-7">
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
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
