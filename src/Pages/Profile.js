import React, { useEffect, useState } from "react";

import "../App.css";
import defaultProfilePic from "../Assets/DefaultProfilePic1.png";
import UpdateProfileForm from "../Components/UpdateProfileForm";

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

export default function Profile({ user, validateUser, setUser }) {
  const classes = useStyles();

  const [profileEdit, setProfileEdit] = useState(false);

  useEffect(() => {
    validateUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h2>Your profile</h2>
      <div className="profile">
        <Card className={classes.root} id="profile-card">
          {profileEdit ? (
            <UpdateProfileForm
              setProfileEdit={setProfileEdit}
              validateUser={validateUser}
              user={user}
              setUser={setUser}
            />
          ) : (
            <>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={user.photo ? user.photo : defaultProfilePic}
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
                    {user.address ? user.address : "No address listed."}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  id="profile-edit-btn"
                  onClick={() => setProfileEdit(true)}
                >
                  Edit
                </Button>
              </CardActions>
            </>
          )}
        </Card>
      </div>
    </>
  );
}
