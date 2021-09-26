import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./AnswersView.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
}));

interface Props {}

const AnswersView = ({}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Typography variant="h5">Personal</Typography>
      <Typography variant="h6">Answers</Typography>
    </div>
  );
};

export default AnswersView;
