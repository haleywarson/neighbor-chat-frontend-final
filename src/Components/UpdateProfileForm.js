import React, { useState } from "react";

import defaultProfilePic from "../Assets/DefaultProfilePic1.png";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const baseUrl = "http://localhost:9000/";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function UpdateProfileForm({ user, setProfileEdit, setUser }) {
  const classes = useStyles();

  const [photo, setPhoto] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // let token = localStorage.getItem("token");
    fetch(baseUrl + "users/" + user.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        photo: photo,
        address: address,
        id: user.id,
      }),
    })
      .then((response) => response.json())
      .then((updatedUser) => setUser(updatedUser), setProfileEdit(false));
  };

  return (
    <Card className={classes.root}>
      <form className={classes.root} noValidate autoComplete="off">
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={defaultProfilePic}
            id="default-profile-pic"
            title="Contemplative Reptile"
          />
          <CardContent id="profile-name">
            <Typography gutterBottom variant="h5" component="h2">
              <TextField
                id="standard-basic"
                label="Photo"
                name="photo"
                value={photo}
                onChange={(event) => setPhoto(event.target.value)}
              />
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <TextField
                id="standard-basic"
                label="Username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              id="profile-content"
            >
              <TextField
                id="standard-basic"
                label="Address"
                name="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            id="profile-edit-btn"
            onClick={handleSubmit}
          >
            Update
          </Button>
          <Button
            size="small"
            color="primary"
            id="profile-edit-btn"
            onClick={() => setProfileEdit(false)}
          >
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
