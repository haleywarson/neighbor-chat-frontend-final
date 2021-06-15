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

    // CLEAN UP THE EFFECT
    // return () => socket.disconnect();
    // close the connection when the component unmounts.
  }, []);

  // const scrollMessageList = () => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("chat message", message);
    addMessages(message);
    setMessage("");
    // scrollMessageList();
  };

  const addMessages = (newMessage) => {
    socket.on("chat message", (newMessage) => {
      setMessages([...messages, newMessage]);
      console.log("messages", messages);
    });
  };

  return (
    <div className="chat-screen">
      {/* CHAT FEED */}
      <ul id="messages-list">
        {messages.length > 0
          ? messages.map((message, index) => (
              <li>
                <Message key={index} message={message} user={user} />
              </li>
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
