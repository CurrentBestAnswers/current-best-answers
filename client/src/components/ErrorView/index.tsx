import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "red",
    fontSize: 50,
  },
  message: {
    margin: theme.spacing(2, 0),
    textAlign: "center",
  },
}));

type RetryCallback = () => void;

interface ErrorViewProps {
  /**
   * Error message to display.
   */
  error: string;
  /**
   * Error icon.
   */
  icon?: ReactElement;
  /**
   * Retry button text.
   */
  retryText?: string;
  /**
   * Callback on retry button click.
   */
  onRetry?: RetryCallback;
}

const ErrorView: React.FunctionComponent<ErrorViewProps> = (
  Props: ErrorViewProps
) => {
  const classes = useStyles();
  const { error, icon, retryText, onRetry } = Props;

  return (
    <Box className={classes.root}>
      {icon ? icon : <ErrorOutlineIcon className={classes.icon} />}
      <Typography className={classes.message}>{error}</Typography>
      {onRetry && (
        <Button variant="outlined" onClick={onRetry}>
          {retryText ? retryText : "Retry"}
        </Button>
      )}
    </Box>
  );
};

export default ErrorView;
