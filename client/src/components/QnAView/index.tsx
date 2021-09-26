import React, { useState } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import QuestionsView from "../QuestionsView";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import AnswersView from "../AnswersView";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import "react-reflex/styles.css";
import styles from "./QnAView.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  paneLayout: {
    height: "100%",
  },
  paneContent: {
    overflow: "auto",
    height: "100%",
  },
  leftIcon: {
    position: "absolute",
    right: 17,
    bottom: 0,
    zIndex: 1,
  },
  rightIcon: {
    position: "absolute",
    left: 17,
    bottom: 0,
    zIndex: 1,
  },
}));

interface Props {}

enum LayoutState {
  Both,
  Answer,
  Question,
}

const QnAView = ({}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [layout, setLayout] = useState(LayoutState.Both);

  return (
    <ReflexContainer className={classes.root} orientation="vertical">
      {layout !== LayoutState.Answer && (
        <ReflexElement className={classes.paneLayout}>
          <IconButton
            className={classes.leftIcon}
            onClick={() => {
              if (layout === LayoutState.Both) {
                setLayout(LayoutState.Answer);
              } else {
                setLayout(LayoutState.Both);
              }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <div className={classes.paneContent}>
            <QuestionsView />
          </div>
        </ReflexElement>
      )}

      {layout === LayoutState.Both && <ReflexSplitter />}

      {layout !== LayoutState.Question && (
        <ReflexElement className={classes.paneLayout}>
          <IconButton
            className={classes.rightIcon}
            onClick={() => {
              if (layout === LayoutState.Both) {
                setLayout(LayoutState.Question);
              } else {
                setLayout(LayoutState.Both);
              }
            }}
          >
            <ChevronRightIcon />
          </IconButton>
          <div className={classes.paneContent}>
            <AnswersView />
          </div>
        </ReflexElement>
      )}
    </ReflexContainer>
  );
};

export default QnAView;
