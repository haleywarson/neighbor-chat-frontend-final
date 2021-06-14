import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function SignUpForm({ signup, setLoginFormToggle }) {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(username, password);
  };

  return (
    <form
      id="signup-form"
      onSubmit={handleSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <h2>Sign Up</h2>

      <TextField
        id="outlined-size-normal"
        label="Enter username"
        variant="outlined"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        name="username"
        placeholder="Username"
      />

      <TextField
        id="outlined-helperText"
        label="Enter password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        name="password"
        placeholder="Password"
      />

      <Button variant="contained" type="submit" id="signup-submit-btn">
        Sign up
      </Button>

      <p id="sign-up-text">Already have an account? </p>
      <span id="login-form-link" onClick={() => setLoginFormToggle(true)}>
        Log in.
      </span>
    </form>
  );
}
