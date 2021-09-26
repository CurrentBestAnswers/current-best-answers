import React, { useState } from "react";
import {
  makeStyles,
  Typography,
  createTheme,
  MuiThemeProvider,
  Box,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MUIRichTextEditor from "mui-rte";

import styles from "./AnswersView.module.scss";

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

interface Props {}

const AnswersView = ({}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [showAnswerToolBar, setAnswerToolBar] = useState(false);

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.questionHeading}>
        Should I own a car? If so, which one?
      </Typography>
      <Typography className={classes.cbaHeading}>
        Current Best Answer
      </Typography>
      <Box className={classes.answerTextBox}>
        <MuiThemeProvider theme={defaultTheme}>
          <MUIRichTextEditor
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
            ]}
            onFocus={() => setAnswerToolBar(true)}
            onBlur={() => setAnswerToolBar(false)}
          />
        </MuiThemeProvider>
      </Box>
    </div>
  );
};

export default AnswersView;
