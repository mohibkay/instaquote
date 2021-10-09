import React from "react";

export default function Content({ content }) {
  return (
    <div className="p-4 border-b border-gray-primary">
      <p>{content}</p>
    </div>
  );
}
