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

export default function LogInForm({ login, error }) {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password);
  };

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <h2>Log In</h2>

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
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        name="password"
        placeholder="Password"
      />

      <Button variant="contained" type="submit" id="login-submit-btn">
        Log in
      </Button>
    </form>
  );
}
