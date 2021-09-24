import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20,
    width: 400,
    textAlign: "center",
  },
  textfield: {
    width: "100%",
  },
  errorText: {
    textAlign: "left",
    color: "red",
  },
  button: {
    marginTop: 10,
  },
}));

interface Props {
  buttonText: string;
  labelText: string;
  onOkay: (response: string) => void;
  onClose: () => void;
}

const TextDialog = ({ buttonText, labelText, onOkay, onClose }: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  return (
    <Dialog onClose={onClose} open>
      <div className={classes.root}>
        <TextField
          className={classes.textfield}
          label={labelText}
          value={response}
          variant="outlined"
          onChange={(event) => {
            setError("");
            setResponse(event.target.value);
          }}
        />
        <Typography className={classes.errorText}>{error}</Typography>
        <Button
          className={classes.button}
          variant="outlined"
          onClick={() => {
            if (response) {
              onOkay(response);
            } else {
              setError(`Please fill ${labelText.toLowerCase()} field.`);
            }
          }}
        >
          {buttonText}
        </Button>
      </div>
    </Dialog>
  );
};

export default TextDialog;
