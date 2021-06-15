import React from "react";

export default function Message({ message, user }) {
  return (
    <li>
      <div className="message">
        <p>{user}</p>
        <div className="message-card">{message}</div>
      </div>
    </li>
  );
}
