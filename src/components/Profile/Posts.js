import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { deleteUserPost, updateUserPost } from "../../services/firebase";
import Post from "../Posts";

export default function Photos({ postsCollection, username, currentUser }) {
  const [posts, setPosts] = useState(postsCollection);

  useEffect(() => {
    if (postsCollection?.length) {
      setPosts(postsCollection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsCollection?.length]);

  console.log("postsCollection");
  console.log(postsCollection);

  const handleDeletePost = async (postId) => {
    try {
      await deleteUserPost(postId);
      const updatedPosts = posts.filter((post) => post.docId !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdatePost = async (postId, post) => {
    try {
      await updateUserPost(postId, post);
      const restOfThePosts = posts.filter((post) => post.docId !== postId);
      const postToUpdate = posts.find((post) => post.docId === postId);
      const updatedPost = {
        ...postToUpdate,
        caption: post,
        dateCreated: Date.now(),
      };
      setPosts([updatedPost, ...restOfThePosts]);
    } catch (error) {
      console.error(error.message);
    }
  };

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
        ) : posts.length > 0 ? (
          posts.map((photo) => {
            const content = { ...photo, username };
            return (
              <Post
                key={photo.docId}
                content={content}
                currentUser={currentUser}
                handleDeletePost={handleDeletePost}
                handleUpdatePost={handleUpdatePost}
              />
            );
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
