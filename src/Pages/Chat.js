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
      setMessages([...messages, message]);
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    // close the connection when the component unmounts.
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
