import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Message from "../Components/Message";
const socket = io("http://127.0.0.1:8080/");

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", (message) => {
      console.log("socket connected?", socket.connected);
      console.log("message", message);
    });
    socket.on("disconnect", () => {
      console.log("disconnected if false:", socket.connected);
    });
  }, []);

  const scrollMessageList = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, message]);
    socket.emit("chat message", message);
    scrollMessageList();
  };

  return (
    <div className="chat">
      {/* CHAT FEED */}
      <ul id="messages-list">
        {messages.map((message) => (
          <li>
            <Message key={message.id} message={message} user={user} />
          </li>
        ))}
      </ul>
      {/* CHAT FORM */}
      <form id="chat-form" action="" onSubmit={handleSubmit}>
        <input
          id="chat-input"
          autocomplete="off"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <input id="chat-button" type="submit" value="Send" />
      </form>
    </div>
  );
}
