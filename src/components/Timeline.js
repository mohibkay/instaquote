import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../customHooks/useUser";
import CreatePost from "./CreatePost";
import Post from "./Posts";
import { deleteUserPost, updateUserPost } from "../services/firebase";

export default function Timeline({ photos }) {
  const [posts, setPosts] = useState(photos);

  useEffect(() => {
    if (photos) {
      setPosts(photos);
    }
  }, [photos]);

  const {
    user: { fullName, username, userId },
  } = useUser();

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
    <div className="container col-span-3 md:col-span-2">
      <CreatePost
        fullName={fullName}
        username={username}
        userId={userId}
        posts={posts}
        setPosts={setPosts}
      />
      {!posts ? (
        <Skeleton count={4} height={500} width={640} className="mb-5" />
      ) : posts?.length > 0 ? (
        posts.map((content) => (
          <Post
            key={content.docId}
            content={content}
            handleDeletePost={handleDeletePost}
            handleUpdatePost={handleUpdatePost}
            currentUser={username}
          />
        ))
      ) : (
        <p className="text-center text-2xl">Follow people to see quotes</p>
      )}
    </div>
  );
}
