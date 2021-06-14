import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./Layout/ResponsiveDrawer";
import Profile from "./Pages/Profile";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import Chat from "./Components/ChatScreen";
// import Home from "./Pages/Home";

import "./App.css";

const baseUrl = "http://localhost:9000/";

function App() {
  // STATE
  const [user, setUser] = useState({});
  // user includes username, password, id
  const [error, setError] = useState("");

  // is user logged in
  const [loginFormToggle, setLoginFormToggle] = useState(false);

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
      .then((user) => setUser({ user }, setLoginFormToggle(true)));
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
          console.log("result", result);
          // if (result.id) {
          setUser(result[0]);
          // }   build profile route
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
  //do i add user object as a dependency above?

  // EVENT HANDLERS

  const displayLogin = () => {
    setLoginFormToggle(true);
  };

  return (
    <Router>
      <Layout user={user} logout={logout}>
        <Switch>
          <Route path="/profile">
            {user.length > 0 ? (
              <Profile user={user} validateUser={validateUser} />
            ) : null}
          </Route>
          <Route path="/">
            {/* <Home
              user={user}
              validateUser={validateUser}
              signup={signup}
              login={login}
              error={error}
              displayLogin={displayLogin}
              loginFormToggle={loginFormToggle}
            /> */}
            {user.username ? (
              <Chat user={user} validateUser={validateUser} />
            ) : (
              <>
                <SignupForm
                  signup={signup}
                  setLoginFormToggle={setLoginFormToggle}
                />
                {loginFormToggle ? (
                  <LoginForm login={login} error={error} />
                ) : null}
              </>
            )}
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
