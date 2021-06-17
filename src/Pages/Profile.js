import React, { useEffect } from "react";

import "../App.css";
import defaultProfilePic from "../Assets/DefaultProfilePic.png";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Profile({ user, validateUser }) {
  const classes = useStyles();

  const editMyProfile = () => {};

  //   fetch user and set user data to state
  useEffect(() => {
    validateUser();
  }, []);

  return (
    <div className="profile">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={defaultProfilePic}
            id="default-profile-pic"
            title="Contemplative Reptile"
          />
          <CardContent id="profile-name">
            <Typography gutterBottom variant="h5" component="h2">
              {user.username}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              id="profile-content"
            >
              Address: 1234 Cedar Lane
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            id="profile-edit-btn"
            onClick={() => editMyProfile()}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
