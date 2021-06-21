import React from "react";

import "../App.css";

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

export default function MyContacts(props) {
  const classes = useStyles();

  const editMyProfile = () => {};

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <div className="my-contacts">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="../Assets/Logo"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {user.username}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Address: 1234 Cedar Lane
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => editMyProfile()}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
