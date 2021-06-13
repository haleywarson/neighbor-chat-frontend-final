import React from "react";

import LoginForm from "../Components/LoginForm";
import SignupForm from "../Components/SignupForm";
import Chat from "../Pages/Chat";

export default function Home(props) {
  return (
    <div className="home">
      {props.isLoggedIn ? (
        <Chat user={props.user} />
      ) : (
        <SignupForm
          signup={props.signup}
          toggleLoginForm={props.toggleLoginForm}
        />
      )}
      {props.displayLoginForm ? (
        <LoginForm login={props.login} error={props.error} />
      ) : null}
    </div>
  );
}
