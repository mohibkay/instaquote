import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default function User({ username, fullName }) {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${username}`} className="flex space-x-4 items-center">
      {/* <img
        src={`/images/avatars/${username}.jpg`}
        alt={`${username} profile`}
        className="h-16 w-16 rounded-full"
      /> */}
      <div className="uppercase bg-blue-medium h-12 w-12 text-center px-2 rounded-full text-3xl text-white font-bold flex justify-center items-center">
        <p>{username?.[0]}</p>
      </div>
      <div className="-space-y-1">
        <p className="font-bold">{username}</p>
        <p className="text-gray-base">{fullName}</p>
      </div>
    </Link>
  );
}

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
