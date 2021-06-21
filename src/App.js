import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./Layout/ResponsiveDrawer";
import Profile from "./Pages/Profile";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import Chat from "./Pages/Chat";
import Neighbors from "./Pages/Neighbors";

import "./App.css";

const baseUrl = "http://localhost:9000/";

function App() {
  // STATE
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  const [error, setError] = useState("");

  const [myContactsIds, setMyContactsIds] = useState([]);

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
      fetch(baseUrl + "profile", {
        // use profile route above
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

  const fetchAllUsers = () => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + "users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((users) => setAllUsers(users));
    }
  };

  useEffect(() => {
    validateUser();
    fetchAllUsers();
  }, []);

  return (
    <Router>
      <Layout
        user={user}
        logout={logout}
        allUsers={allUsers}
        myContactsIds={myContactsIds}
        setMyContactsIds={setMyContactsIds}
      >
        <Switch>
          <Route path="/profile">
            {user.username ? (
              <Profile user={user} validateUser={validateUser} />
            ) : null}
          </Route>
          <Route path="/neighbors">
            <Neighbors allUsers={allUsers} validateUser={validateUser} />
          </Route>
          <Route path="/">
            {user.username ? (
              <Chat
                user={user}
                validateUser={validateUser}
                allUsers={allUsers}
              />
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
