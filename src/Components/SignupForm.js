import React, { useState } from "react";

export default function SignUpForm({ signup, displayLogin }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(user);
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="username"
        placeholder="Enter username"
        value={user.username}
        onChange={handleChange}
        placeholder="enter username"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        placeholder="enter password"
        onChange={handleChange}
      />

      <input variant="dark" type="submit" value="sign up" />
      <p id="sign-up-text">
        Already have an account?{" "}
        <span onClick={() => displayLogin()}>Log in.</span>
      </p>
    </form>
  );
}
