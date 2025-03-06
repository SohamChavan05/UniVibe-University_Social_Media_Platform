import React from "react";

const MessageCard = ({ post, isOwnMessage }) => {
  return (
    <div className={`flex mb-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 max-w-xs break-words rounded-lg shadow-md ${
          isOwnMessage ? "bg-blue-500 text-white" : "bg-white text-black"
        }`}
      >
        <h3 className="text-sm font-semibold">{post.createdBy.name} ({post.createdBy.enrollment})</h3>
        <p>{post.content}</p>
        <small className="text-xs text-gray-400 flex justify-end">
          {new Date(post.createdAt).toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
};

export default MessageCard;
