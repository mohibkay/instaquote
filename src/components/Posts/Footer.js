import PropTypes from "prop-types";

export default function Footer({ username, caption }) {
  return (
    <div className="flex space-x-1 items-center px-4">
      <p className="font-bold">{username}</p>
      <p>{caption}</p>
    </div>
  );
}

Footer.propTypes = {
  username: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
