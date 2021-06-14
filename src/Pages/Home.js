import React, { useEffect } from "react";

import LoginForm from "../Components/LoginForm";
import SignupForm from "../Components/SignupForm";
import Chat from "../Components/Chat";

export default function Home({
  user,
  validateUser,
  signup,
  login,
  error,
  setLoginFormToggle,
  loginFormToggle,
}) {
  useEffect(() => {
    validateUser();
  }, []);

  return (
    <div className="home">
      {user.length > 0 ? (
        <Chat user={user} validateUser={validateUser} />
      ) : (
        <SignupForm signup={signup} setLoginFormToggle={setLoginFormToggle} />
      )}
      {loginFormToggle ? <LoginForm login={login} error={error} /> : null}
    </div>
  );
}
