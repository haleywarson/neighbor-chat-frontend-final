import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import Message from "../Components/Message";

const socket = io("http://127.0.0.1:8080/");

export default function Chat({ user, validateUser, allUsers }) {
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
    <div className="chat">
      <h3>Welcome, {user.username}!</h3>
      <br />
      <div className="chat-feed">
        {messages.length > 0
          ? messages.map((m, index) => {
              const isCurrentUser = m.user === user.username;
              return (
                <Message
                  key={index}
                  message={m.message}
                  user={m.user}
                  alignItems={isCurrentUser ? "flex-end" : "flex-start"}
                  backgroundColor={isCurrentUser ? "#6899a84f" : "#7da37e5f"}
                />
              );
            })
          : null}
      </div>
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
