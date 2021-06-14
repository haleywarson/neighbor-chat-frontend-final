import React, { useEffect } from "react";
import "../App.css";

export default function Profile({ user, validateUser }) {
  //   fetch user and set user data to state
  useEffect(() => {
    validateUser();
  }, []);

  return <div className="profile">profile here</div>;
}
