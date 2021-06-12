import React from "react";
import "../App.css";

import LoginForm from "../Components/LoginForm";
import SignupForm from "../Components/SignupForm";

export default function Home({
  signup,
  user,
  login,
  error,
  loginToggle,
  displayLogin,
}) {
  return (
    <div className="home">
      {user.username ? <h2>welcome, {user.username}</h2> : null}
      <SignupForm signup={signup} displayLogin={displayLogin} />
      {loginToggle ? <LoginForm login={login} error={error} /> : null}
    </div>
  );
}
