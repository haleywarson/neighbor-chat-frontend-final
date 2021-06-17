import React from "react";

import defaultProfilePic from "../Assets/DefaultProfilePic1.png";

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

export default function UserCard({ user }) {
  const classes = useStyles();

  return (
    <div className="user-card">
      <Card className={classes.root} id="neighbor-card">
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
              Address: Enter address here.
              {/* {user.address ? { user.address } : "None listed."} */}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="outlined"
            id="start-chat-btn"
            onClick={(event) => console.log("adding friend", user.username)}
          >
            Add contact
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
