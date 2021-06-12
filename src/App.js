import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "./Pages/Profile";
import ResponsiveDrawer from "./Pages/ResponsiveDrawer";

import "./App.css";
import { FormatColorResetOutlined } from "@material-ui/icons";

const baseUrl = "http://localhost:9000/";

function App() {
  // STATE
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // SIGNUP AND LOGIN/OUT
  const signup = (user) => {
    fetch(baseUrl + "users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password,
        },
      }),
    })
      .then((response) => response.json())
      .then((user) => setUser({ user }));
  };

  const login = (username, password) => {
    fetch(baseUrl + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          setUser(result.user);
          setIsLoggedIn(true);
        } else {
          setError(result.error);
        }
      });
  };

  const validateUser = () => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + "profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.id) {
            setUser(result);
          }
        });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  useEffect(() => {
    validateUser();
  }, []);

  // EVENT HANDLERS
  const toggleLoginForm = () => {
    setDisplayLoginForm(true);
  };

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <ResponsiveDrawer
              user={user}
              signup={signup}
              toggleLoginForm={toggleLoginForm}
              login={login}
              error={error}
              displayLogin={displayLogin}
              isLoggedIn={isLoggedIn}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
