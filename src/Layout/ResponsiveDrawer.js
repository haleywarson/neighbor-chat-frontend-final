import React from "react";
import { Link } from "react-router-dom";

import ChatDialog from "../Components/ChatDialog";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const displayChatDialog = () => {
    <ChatDialog />;
  };

  const displayNeighbors = () => {

  }

  const drawer = (
    <div>
      <Hidden xsDown implementation="css">
        <div className={classes.toolbar} />
      </Hidden>
      <MenuList>
        <MenuItem id="nav-link" onClick={() => props.logout()}>
          Logout
        </MenuItem>
        <MenuItem id="nav-link" component={Link} to="/profile">
          Profile
        </MenuItem>
        <MenuItem id="nav-link" component={Link} to="/chat">
          Chat
        </MenuItem>
        {/* NEED GROUPS HERE + CONTACTS */}
        <MenuList>
          {/* {props.user.userchats({id, user.username} => {
            return 
            <MenuItem 
            id="nested-nav-link"
            key={id} 
            className={classes.nested} 
            user={user} 
                otherUser={user.username} 
                component={Link} 
                to={`/chat/${id}`} 
                >
                {user.username}
                </MenuItem>;
              })} */}
        </MenuList>
        {/* <Divider /> */}
        <MenuItem id="nav-link">
          <Button variant="outlined" onClick={() => displayChatDialog()}>
            Start chat
          </Button>
          <Button variant="outlined" onClick={() => displayNeighbors()}>
            Add neighbor
          </Button>
        </MenuItem>
      </MenuList>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar id="nav-bar" position="absolute" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography id="logo" variant="h6" noWrap>
            Neighbor Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;