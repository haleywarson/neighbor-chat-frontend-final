# Neighbor Chat

## Table of Contents

[General Info](#general-info)

[Demo](#demo)

[Technologies](#technologies)

[Setup](#setup)

[Features](#features)

[Code Examples](#code-examples)

[Inspiration](#inspiration)

[Contact](#contact)

## General Info

Neighbor Chat is a chat platform for sharing, helping, and connecting with neighbors on your block.
The back end repo for this project can be found [here](https://github.com/haleywarson/neighbor-chat-backend).

## Demo

![Demo](https://youtu.be/pfJHJe_RP2M)

## Technologies

- React
- Node.js
- Express
- Socket.io

## Setup

First, fork and clone the backend repo. Open the code, run "npm install" and "npm start". 
Then fork and clone the frontend repo, open the code, run "npm install" and "npm start." Run "npm start" from another tab in your terminal to log in a second user for chatting.

## Features

- User authorization and login/logout.
- Chat with neighbors in real time.
- View your neighbors' profiles, including their name, photo, and address.
- Edit/update your profile.
- Add neighbors to your contacts list.

## Code Examples

```js
useEffect(() => {
    validateUser();
    divRef.current.scrollIntoView({ behavior: "smooth" });
    socket.on("connect", () => {
      console.log("socket connected?", socket.connected);
    });
    socket.on("chat message", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => socket.off("chat message");
  }, [messages]);
```
  
```js
router.post("/login", (request, response) => {
  const { user } = request.body;

  User.query()
    .findOne({ username: user.username || "" })
    .withGraphFetched("friends")
    .then((existingUser) => {
      if (!existingUser) {
        response.status(401).json({ error: "Invalid username/password." });
      } else {
        bcrypt
          .compare(user.password, existingUser.password_digest)
          .then((isMatch) => {
            if (!isMatch) {
              response
                .status(401)
                .json({ error: "Invalid username/password." });
            } else {
              const secret = process.env.AUTH_SECRET;
              const payload = { user_id: existingUser.id };
              const token = jwt.sign(payload, secret);
              response.status(200).json({ token, user: existingUser });
            }
          });
      }
    });
});
```

## Inspiration

With more and more people working from home, we are seeing and communicating with our neighbors more often. Neighbor Chat was designed to allow for more sharing, helping, and connecting with those who live close by. 

## Contact

Neighbor Chat was created by [Haley Warson](https://www.linkedin.com/in/haleywarson/).

Contact me with any questions.
