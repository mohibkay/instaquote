import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import Post from "../Posts";

export default function Photos({ posts, username }) {
  return (
    <div className="border-t border-gray-primary mt-10">
      <span className="flex justify-center my-3 items-center space-x-1">
        <span className="uppercase">quotes</span>
      </span>

      <div className="mb-8 w-4/5 m-auto">
        {!posts ? (
          <Skeleton
            count={9}
            height={400}
            width={320}
            className="col-span-1 flex"
          />
        ) : posts.length > 1 ? (
          posts.map((photo) => {
            const content = { ...photo, username };
            return <Post key={photo.docId} content={content} />;
          })
        ) : null}
      </div>

      {!posts ||
        (posts.length === 0 && (
          <p className="text-center text-2xl">No Posts Yet</p>
        ))}
    </div>
  );
}

Photos.propTypes = {
  posts: PropTypes.array.isRequired,
};
