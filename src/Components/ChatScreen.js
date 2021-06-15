import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Message from "./Message";
const socket = io("http://127.0.0.1:8080/");

export default function ChatScreen({ user, validateUser, allUsers }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    validateUser();
    socket.on("connect", () => {
      console.log("socket connected?", socket.connected);
    });
    socket.on("chat message", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => socket.off("chat message");
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("chat message", { user: user.username, message });
    setMessage("");
  };

  return (
    <div className="chat-screen">
      {/* CHAT FEED */}
      <ul id="messages-list">
        {messages.length > 0
          ? messages.map((message, index) => (
              <Message
                key={index}
                message={message.message}
                user={message.user}
              />
            ))
          : null}
      </ul>
      {/* CHAT FORM */}
      <form id="chat-form" action="" onSubmit={handleSubmit}>
        <input
          id="chat-input"
          autoComplete="off"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <input id="chat-button" type="submit" value="Send" />
      </form>
    </div>
  );
}
