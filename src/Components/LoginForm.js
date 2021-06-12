import React, { useState } from "react";

export default function LogInForm({ login, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <input
        type="password"
        placeholder="enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <input value="log in" variant="dark" type="submit" />
    </form>
  );
}
