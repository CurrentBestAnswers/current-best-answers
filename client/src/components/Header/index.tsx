import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Avatar,
  IconButton,
  makeStyles,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import styles from "./Header.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    color: "black",
  },
  title: {
    flexGrow: 1,
  },
  menuPopup: {
    padding: 15,
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  userAvatar: {
    marginRight: 10,
  },
}));

interface Props {}

const Header = ({}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | undefined>(
    undefined
  );

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          Current Best Answers
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <MenuIcon />
        </IconButton>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className={classes.menuPopup}>
            <div className={classes.userInfo}>
              <Avatar className={classes.userAvatar}>H</Avatar>
              <Typography>Hanzla Mateen</Typography>
            </div>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>All Graphs</MenuItem>
            <MenuItem onClick={handleClose}>Sign Out</MenuItem>
          </div>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
