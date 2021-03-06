import React, { useRef, useState } from "react";
import {
  makeStyles,
  Typography,
  createTheme,
  MuiThemeProvider,
  Box,
  LinearProgress,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import MUIRichTextEditor, { TMUIRichTextEditorRef } from "mui-rte";
import queryString from "query-string";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ErrorView from "../ErrorView";
import { RootState } from "../../store";
import { getGraphItem, updateGraphItemAnswer } from "../../slice/graphsSlice";
import { Graph, GraphItem } from "../../models/graph";

import styles from "./AnswersView.module.scss";
import { patchGraphItemAnswer } from "../../api/graphItemApi";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  questionHeading: {
    marginLeft: 10,
    marginTop: 60,
  },
  cbaHeading: {
    marginLeft: 30,
    marginTop: 20,
    fontWeight: "bold",
  },
  answerTextBox: {
    height: "100%",
    marginLeft: 50,
    marginTop: 20,
  },
  errorIcon: {
    color: "gray",
    fontSize: 50,
  },
}));

const defaultTheme = createTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        height: "100%",
      },
      container: {
        height: "100%",
      },
      toolbar: {
        textAlign: "center",
      },
      placeHolder: {
        height: "100%",
      },
      editor: {
        height: "100%",
      },
      editorContainer: {
        height: "100%",
      },
    },
  },
});

interface Props {
  graph: Graph;
}

const AnswersView = ({ graph }: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const rtfRef = useRef<TMUIRichTextEditorRef>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [showAnswerToolBar, setAnswerToolBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const parsedQs = queryString.parse(history.location.search);
  let questionId =
    parsedQs && parsedQs.question ? parsedQs.question.toString() : "";

  let question: GraphItem | undefined;
  if (questionId) {
    question = getGraphItem(graph.data, questionId);
  }

  if (!question) {
    return (
      <ErrorView
        error="Please select a question"
        icon={<QuestionAnswerIcon className={classes.errorIcon} />}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.questionHeading}>
        {question.name}
      </Typography>
      <Typography className={classes.cbaHeading}>
        Current Best Answer
      </Typography>
      {isLoading && <LinearProgress />}
      <Box className={classes.answerTextBox}>
        <MuiThemeProvider theme={defaultTheme}>
          <MUIRichTextEditor
            ref={rtfRef}
            label="Start typing..."
            toolbar={showAnswerToolBar}
            controls={[
              "bold",
              "italic",
              "underline",
              "highlight",
              "quote",
              "code",
              "strikethrough",
              "link",
              "numberList",
              "bulletList",
              "save",
            ]}
            defaultValue={question.answer}
            onFocus={() => setAnswerToolBar(true)}
            onBlur={() => {
              setAnswerToolBar(false);
              rtfRef.current?.save();
            }}
            onSave={async (answer) => {
              try {
                setIsLoading(true);

                await patchGraphItemAnswer(question!, answer);

                dispatch(
                  updateGraphItemAnswer({
                    answer,
                    graphId: graph._id,
                    graphItemId: questionId,
                  })
                );

                setIsLoading(false);
              } catch (err) {
                enqueueSnackbar(`Failed to save answer`, {
                  variant: "error",
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                });
              }
            }}
          />
        </MuiThemeProvider>
      </Box>
    </div>
  );
};

export default AnswersView;
