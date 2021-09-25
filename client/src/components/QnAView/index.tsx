import React, { useState } from "react";
import styles from "./QnAView.module.scss";
import { IconButton, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import QuestionsView from "../QuestionsView";
import SplitPane, { Size } from "react-split-pane";
import AnswersView from "../AnswersView";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

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
  const [size, setSize] = useState<Size>("50%");

  return (
    <SplitPane
      className={classes.root}
      split="vertical"
      size={layout === LayoutState.Both ? size : "100%"}
      onChange={(size) => setSize(size)}
    >
      {layout !== LayoutState.Answer && (
        <div className={classes.paneLayout}>
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
        </div>
      )}
      {layout !== LayoutState.Question && (
        <div className={classes.paneLayout}>
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
        </div>
      )}
    </SplitPane>
  );
};

export default QnAView;
