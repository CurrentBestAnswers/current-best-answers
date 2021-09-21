import React from "react";
import styles from "./Graph.module.scss";
import { Dispatch } from "redux";
import { useHistory } from 'react-router-dom';
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
import LockIcon from "@material-ui/icons/Lock";
import GroupIcon from "@material-ui/icons/Group";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px auto",
  },
  listItem: {
    border: "0.5px solid #D3D3D3",
    borderRadius: 5,
    marginTop: 10,
    width: 250,
  },
  listItemText: {
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

  const graphs = [
    {
      name: "Personal",
      isPrivate: true,
    },
    {
      name: "Work",
      isPrivate: true,
    },
    {
      name: "Public",
      isPrivate: false,
    },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h5">Graphs</Typography>

      <List dense>
        {graphs.map((item, index) => {
          return (
            <ListItem
              key={`graph-${index}`}
              className={classes.listItem}
              button
            >
              <ListItemText
                className={classes.listItemText}
                primary={item.name}
              />
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
      
      <IconButton className={classes.iconButton} onClick={() => history.push('/graphs/add')}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default Graph;
