import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { firebase } from "../../lib/firebase";
import {
  getFollowedUserPhotos,
  getUserByUserId,
} from "../../services/firebase";

export default function CreatePost({ fullName, userId, setPosts }) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isInvalid = !text.trim();

  console.log("isLoading");
  console.log(isLoading);

  const postObj = {
    caption: text,
    comments: [],
    likes: [],
    userId: userId,
    dateCreated: Date.now(),
  };

  async function getTimelinePosts() {
    const [{ following }] = await getUserByUserId(userId);
    let followedUserPosts = [];

    if (following?.length > 0) {
      followedUserPosts = await getFollowedUserPhotos(userId, following);
    }
    followedUserPosts.sort((a, b) => b.dateCreated - a.dateCreated);
    setPosts(followedUserPosts);
    setText("");
    setIsLoading(false);
  }

  const handleCreatePost = async () => {
    try {
      setIsLoading(true);
      await firebase.firestore().collection("photos").add(postObj);

      getTimelinePosts();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="border border-gray-primary mb-8 p-2 rounded pt-3">
      <div className="flex">
        <div className="uppercase bg-blue-medium h-10 w-10 text-center px-2 rounded-full text-2xl text-white font-bold mr-4 ml-2 flex justify-center items-center">
          <p>{fullName?.[0]}</p>
        </div>

        <TextareaAutosize
          minRows="2"
          placeholder="Share Quote"
          className="p-1 w-full outline-none inline-block text-xl"
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
      </div>

      <div className="w-full mt-4 ml-2">
        <button
          disabled={isInvalid || isLoading}
          onClick={handleCreatePost}
          className={`ml-auto bg-blue-medium text-white py-1 px-4 rounded mb-2 w-24 ${
            isInvalid && "opacity-50 cursor-default"
          } ${isLoading && "opacity-75 cursor-not-allowed"}`}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
