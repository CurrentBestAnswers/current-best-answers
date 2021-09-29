import React, { useState } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import queryString from "query-string";
import ErrorView from "../ErrorView";
import QuestionsView from "../QuestionsView";
import AnswersView from "../AnswersView";
import { getGraph } from "../../slice/graphsSlice";
import { Routes } from "../../router";
import { RootState } from "../../store";

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
  
  const parsedQs = queryString.parse(history.location.search);
  let graphId = parsedQs && parsedQs.graph ? parsedQs.graph.toString() : "";

  const graph = useSelector((state: RootState) => {
    if (graphId) {
      let selectedGraph = getGraph(state.graph.graphs, graphId);
      return selectedGraph;
    }

    return undefined;
  });

  if (!graph) {
    return (
      <ErrorView
        error="Please select a graph first"
        retryText="All Graphs"
        onRetry={() => history.push(Routes.Home)}
      />
    );
  }

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
            <QuestionsView graph={graph} />
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
            <AnswersView graph={graph} />
          </div>
        </ReflexElement>
      )}
    </ReflexContainer>
  );
};

export default QnAView;
