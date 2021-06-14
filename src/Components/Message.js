import React from "react";

export default function Message({ message, user }) {
  return (
    <div className="message">
      <p>{user.username}</p>
      <div className="message-card">{message}</div>
    </div>
  );
}
