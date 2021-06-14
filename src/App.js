import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Profile from "./Pages/Profile";
import Layout from "./Layout/ResponsiveDrawer";
import Home from "./Pages/Home";

import "./App.css";

const baseUrl = "http://localhost:9000/";

function App() {
  // STATE
  const [user, setUser] = useState({});
  // user includes username, password, id
  const [error, setError] = useState("");

  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // SIGNUP AND LOGIN/OUT
  const signup = (username, password) => {
    fetch(baseUrl + "users", {
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
      .then((user) => setUser({ user }, toggleLoginForm()));
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
      fetch(baseUrl + "users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.id) {
            setUser(result);
            console.log("user in state:", result);
          }
        });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
    console.log("logging out - current user is now:", user);
  };

  useEffect(() => {
    validateUser();
  }, []);
  //do i add user object as a dependency above?

  // EVENT HANDLERS
  const toggleLoginForm = () => {
    setDisplayLoginForm(true);
  };

  return (
    <Router>
      <Layout user={user} logout={logout}>
        <Switch>
          <Route path="/profile">
            <Profile user={user} />
          </Route>
          <Route path="/">
            <Home
              user={user}
              signup={signup}
              toggleLoginForm={toggleLoginForm}
              login={login}
              error={error}
              isLoggedIn={isLoggedIn}
              displayLoginForm={displayLoginForm}
            />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
