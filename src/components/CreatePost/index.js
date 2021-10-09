import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { firebase } from "../../lib/firebase";

export default function CreatePost({
  fullName,
  username,
  userId,
  posts,
  setPosts,
}) {
  const [text, setText] = useState();

  const handleCreatePost = () => {
    const postObj = {
      caption: text,
      comments: [],
      likes: [],
      userId: userId,
      dateCreated: Date.now(),
    };

    setPosts([{ ...postObj, username }, ...posts]);
    setText("");

    try {
      firebase.firestore().collection("photos").add(postObj);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="border border-gray-primary mb-8 p-2 rounded pt-3">
      <div className="flex">
        <div className="uppercase bg-blue-medium h-10 w-10 text-center px-2 rounded-full text-3xl text-white font-bold mr-4 ml-2 flex justify-center items-center">
          <p>{fullName?.[0]}</p>
        </div>

        <TextareaAutosize
          minRows="2"
          placeholder="Create Post"
          className="p-1 w-full outline-none inline-block"
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
      </div>

      <div className="w-full mt-4 ml-2">
        <button
          onClick={handleCreatePost}
          className="ml-auto bg-blue-medium text-white py-1 px-4 rounded mb-2"
        >
          Post
        </button>
      </div>
    </div>
  );
}
