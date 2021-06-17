import React, { useEffect, useState } from "react";

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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function UpdateProfileForm({
  user,
  setProfileEdit,
  validateUser,
}) {
  const classes = useStyles();

  //   const [formValues, setFormValues] = useState({
  //     username: user.username,
  //     address: user.address,
  //   });

  const handleChange = (event) => {
    console.log("event target value", event.target.value);
    console.log("handling change...");
    // setFormValues({
    //     [event.target.name]: event.target.value
    // })
  };

  const updateProfile = (event) => {
    console.log("updating profile");
  };

  //   fetch user and set user data to state
  useEffect(() => {
    validateUser();
  }, []);

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
                label="Username"
                name={user.username}
                value={user.username}
                onChange={(event) => handleChange(event)}
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
                name={user.username}
                value={user.username}
                onChange={(event) => handleChange(event)}
              />
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            id="profile-edit-btn"
            onClick={updateProfile}
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
