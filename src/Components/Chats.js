import React from "react";
// import { useChats } from "../contexts/ChatsProvider";
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

export default function Chats() {
  const classes = useStyles();

  const { chats, selectChatIndex } = useChats();

  return (
    <div className={classes.root}>
      <List component="nav">
        {chats.map((chat, index) => (
          <ListItem key={index}>
            {contact.name} onClick={() => selectChatIndex(index)}
          </ListItem>
        ))}
        {chat.recipients.map((r) => r.name).join(", ")}
      </List>
    </div>
  );
}
