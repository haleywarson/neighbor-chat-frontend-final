import React from "react";

export default function Message({
  message,
  user,
  alignItems,
  backgroundColor,
}) {
  const messageListStyle = {
    color: "#c95254",
    fontFamily: "Lato",
  };

  const messageStyle = {
    maxWidth: "255px",
    wordWrap: "break-word",
    marginBottom: "12px",
    lineHeight: "24px",
    position: "relative",
    padding: "10px 20px",
    borderRadius: "25px",
    backgroundColor: backgroundColor,
    alignItems: alignItems,
  };

  return (
    <ul style={messageListStyle}>
      <p>{user}</p>
      <li style={messageStyle}>{message}</li>
    </ul>
  );
}
