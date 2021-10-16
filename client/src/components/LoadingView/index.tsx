import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    margin: theme.spacing(2, 0),
    textAlign: "center",
  },
}));

interface LoadingViewProps {
  /**
   * Loading message to display.
   */
  message: string;
}

const LoadingView: React.FunctionComponent<LoadingViewProps> = (
  Props: LoadingViewProps
) => {
  const classes = useStyles();
  const { message } = Props;

  return (
    <Box className={classes.root}>
      <CircularProgress />
      <Typography className={classes.message}>{message}</Typography>
    </Box>
  );
};

export default LoadingView;
