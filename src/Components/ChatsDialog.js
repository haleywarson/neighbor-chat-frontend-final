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

export default function ChatsDialog({ handleClose, user, allUsers }) {
  const classes = useStyles();
  const [recipient, setRecipient] = React.useState("");

  const handleChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting");
  };

  return (
    <div className="chats-dialog">
      <DialogTitle id="form-dialog-title">Start a chat</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a neighbor to start a chat.</DialogContentText>
        <FormControl className={classes.formControl} onSubmit={handleSubmit}>
          <InputLabel id="demo-simple-select-label">Add neighbor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
          >
            <MenuItem value="Rita">Rita</MenuItem>
            <MenuItem value="Bob">Bob</MenuItem>
            {/* {allUsers.map((u) => (
              <MenuItem key={u.id}>{u.username}</MenuItem>
            ))} */}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Start chat
        </Button>
      </DialogActions>
    </div>
  );
}
