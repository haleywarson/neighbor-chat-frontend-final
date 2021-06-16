import React from "react";

export default function Message({ message, user }) {
  return (
    <>
      <p>{user}</p>
      <li>{message}</li>
    </>
  );
}
