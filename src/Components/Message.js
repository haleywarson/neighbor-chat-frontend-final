import React from "react";

export default function Message({ message, user, alignSelf, backgroundColor }) {
  const messageListStyle = {
    color: "#375058",
    fontFamily: "Lato",
    display: "flex",
    flexDirection: "column",
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
    alignSelf: alignSelf,
  };

  const usernameStyle = {
    alignSelf: alignSelf,
  };

  return (
    <div style={messageListStyle}>
      <p style={usernameStyle}>{user}</p>
      <p style={messageStyle}>{message}</p>
    </div>
  );
}
