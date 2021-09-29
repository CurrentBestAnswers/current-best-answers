import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import LockIcon from "@material-ui/icons/Lock";
import GroupIcon from "@material-ui/icons/Group";
import AddIcon from "@material-ui/icons/Add";
import { RootState } from "../../store";
import { Routes } from "../../router";

import styles from "./Graph.module.scss";

const useStyles = makeStyles((theme) => ({
  listItem: {
    border: "0.5px solid #D3D3D3",
    borderRadius: 5,
    marginTop: 10,
  },
  listItemIcon: {
    fontSize: 16,
  },
  iconButton: {
    border: "0.5px solid #D3D3D3",
  },
}));

interface Props {}

const Graph = ({}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  const { graphs } = useSelector((state: RootState) => state.graph);

  return (
    <>
      <Typography variant="h5">Graphs</Typography>

      <List dense>
        {graphs.map((item, index) => {
          return (
            <ListItem
              key={item.id}
              className={classes.listItem}
              button
              onClick={() =>
                history.push(`${Routes.Questions}?graph=${item.id}`)
              }
            >
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                {item.isPrivate ? (
                  <LockIcon className={classes.listItemIcon} />
                ) : (
                  <GroupIcon className={classes.listItemIcon} />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>

      <IconButton
        className={classes.iconButton}
        onClick={() => history.push(Routes.AddGraph)}
      >
        <AddIcon />
      </IconButton>
    </>
  );
};

export default Graph;
