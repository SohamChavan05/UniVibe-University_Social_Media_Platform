import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {io} from 'socket.io-client'
import MessageCard from "./MessageCard";


const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { communityName } = useParams();
  const messagesEndRef = useRef(null);
  const userId = localStorage.getItem("userId");

  const socket = useRef(null)
  
  useEffect(() => {
    socket.current = io("http://localhost:8000")
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/post/getAllPost",
          { communityName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPosts(response.data.details.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    socket.current.emit("joinCommunity", communityName);

    socket.current.on("newPost", (newPost) => {
      setPosts((prevPosts) => [...prevPosts, newPost]);
      console.log(newPost)
    });

    return () => {
      socket.current.disconnect();
    };
  }, [communityName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [posts,message]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const token = localStorage.getItem("token");
    socket.current.emit("addPost",message,communityName,userId)
    setMessage("");

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/post/addPost",
    //     { communityName, content: message },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );
    // } catch (error) {
    //   console.error("Error sending message:", error);
    // }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <h2 className="text-xl font-semibold mb-4">{communityName}</h2>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg shadow-inner">
        {loading ? (
          <div className="animate-pulse bg-gray-300 h-12 w-full mb-2 rounded-md"></div>
        ) : posts.length > 0 ? (
          posts
          .filter(post => post.createdBy)
          .map((post) => (
            <MessageCard key={post._id} post={post} isOwnMessage={post.createdBy?.enrollment == userId} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet.</p>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Message Input */}
      <form 
      onSubmit={(e)=>{
          e.preventDefault();
          sendMessage();
      }}
      className="flex items-center gap-2 p-2 border-t mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          // onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default PostList;
