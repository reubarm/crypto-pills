import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import WalletButton from "./WalletButton";

import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    fontSize: "2rem",
    filter: "drop-shadow(2px 2px 1px #000000)",
  },
  menuItem: {},
}));

export default function MobileMenu(props) {
  const classes = useStyles();
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        className={classes.menuIconContainer}
        {...props}
      >
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{ backgroundColor: "#fff", padding: "10px", height: "100%" }}
        >
          <List component="nav">
            <WalletButton />
            <Divider />
            <ListItem button component="a" href="/">
              <ListItemText
                primary="Home"
                primaryTypographyProps={{
                  variant: "h5",
                  className: classes.menuItem,
                }}
              />
            </ListItem>
            <ListItem button component="a" href="/#roadmap">
              <ListItemText
                primary="Roadmap"
                primaryTypographyProps={{
                  variant: "h5",
                  className: classes.menuItem,
                }}
              />
            </ListItem>
            <ListItem button component="a" href="https://pillman-beta.netlify.app/">
              <ListItemText
                primary="Play"
                primaryTypographyProps={{
                  variant: "h5",
                  className: classes.menuItem,
                }}
              />
            </ListItem>
            <ListItem button component="a" href="https://dropthepill.com/">
              <ListItemText
                primary="Merchandise"
                primaryTypographyProps={{
                  variant: "h5",
                  className: classes.menuItem,
                }}
              />
            </ListItem>{" "}

   
          
          </List>
        </div>
      </Drawer>
    </>
  );
}
