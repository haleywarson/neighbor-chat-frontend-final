import React from "react";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ChatsDialog(props) {
  const classes = useStyles();

  const handleSubmit = () => {
    props.saveContact();
    props.handleClose();
  };

  return (
    <div id="chats-dialog">
      <DialogTitle id="form-dialog-title">
        <h2 id="chats-dialog-title">Add contact</h2>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="chats-dialog-text">
          <p id="chats-dialog-prompt">Add a neighbor to your contacts list.</p>
        </DialogContentText>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            <p id="chats-dialog-input-starter">Add neighbor</p>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={props.handleContactChange}
            value={props.allUsers.id}
          >
            {props.allUsers.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add contact
        </Button>
      </DialogActions>
    </div>
  );
}
