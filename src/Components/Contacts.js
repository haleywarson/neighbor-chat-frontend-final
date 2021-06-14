import React from "react";

// import { useContacts } from "../contexts/ContactsProvider";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Contacts({ contacts }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav">
        {contacts.map((contact) => (
          <ListItem key={contact.id}>{contact.name}</ListItem>
        ))}
      </List>
    </div>
  );
}
