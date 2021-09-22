import React from "react";
import styles from "./ResponseView.module.scss";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    height: "100%",
  },
}));

interface Props {}

const ResponseView = ({}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Typography variant="h6">Should I own a car? If so, which one?</Typography>
    </div>
  );
};

export default ResponseView;
