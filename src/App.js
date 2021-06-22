import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./Layout/ResponsiveDrawer";
import Profile from "./Pages/Profile";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import Chat from "./Pages/Chat";
import Neighbors from "./Pages/Neighbors";
import Contacts from "./Pages/Contacts";

import "./App.css";

const baseUrl = "http://localhost:9000/";

function App() {
  // STATE
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  const [error, setError] = useState("");

  const [myContacts, setMyContacts] = useState([]);

  const [newContactId, setNewContactId] = useState(0);

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
          console.log("result user", result.user);
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

  // EVENT HANDLERS
  const handleContactChange = (event) => {
    event.persist();
    const newContactId = event.target.value;
    setNewContactId(newContactId);
    setMyContacts([...myContacts, newContactId]);
  };

  const saveContact = () => {
    let token = localStorage.getItem("token");
    fetch(baseUrl + "friendships", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        friendship: {
          user_id: user.id,
          friend_id: newContactId,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <Router>
      <Layout
        user={user}
        logout={logout}
        allUsers={allUsers}
        saveContact={saveContact}
        handleContactChange={handleContactChange}
        myContacts={myContacts}
        validateUser={validateUser}
      >
        <Switch>
          <Route path="/profile">
            {user.username ? (
              <Profile
                user={user}
                validateUser={validateUser}
                setUser={setUser}
              />
            ) : null}
          </Route>
          <Route path="/neighbors">
            <Neighbors
              allUsers={allUsers}
              newContactId={newContactId}
              setNewContactId={setNewContactId}
              saveContact={saveContact}
              validateUser={validateUser}
            />
          </Route>
          <Route path="/contacts">
            <Contacts
              myContacts={myContacts}
              validateUser={validateUser}
              user={user}
            />
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
