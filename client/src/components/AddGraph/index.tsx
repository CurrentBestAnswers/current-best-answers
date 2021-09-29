import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Button,
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import GroupIcon from "@material-ui/icons/Group";

import styles from "./AddGraph.module.scss";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: 30,
    marginBottom: 20,
  },
  textField: {
  },
  radioGroup: {
    marginTop: 10,
    display: "block",
  },
  radioLabel: {
    display: "flex",
  },
  radioIcon: {
    fontSize: 18,
    marginLeft: 20,
  },
  button: {
    marginTop: 20,
  },
}));

interface Props {}

const AddGraph = ({}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Typography className={classes.heading} variant="h5">
        Create New Graph
      </Typography>

      <TextField
        className={classes.textField}
        fullWidth
        size="small"
        label="Graph Name"
        variant="outlined"
      />

      <FormControl className={classes.radioGroup} component="fieldset">
        <RadioGroup defaultValue="private">
          <FormControlLabel
            value="private"
            control={<Radio color="default" />}
            label={
              <div className={classes.radioLabel}>
                <Typography>Private</Typography>
                <LockIcon className={classes.radioIcon} />
              </div>
            }
          />
          <FormControlLabel
            value="public"
            control={<Radio color="default" />}
            label={
              <div className={classes.radioLabel}>
                <Typography>Public</Typography>
                <GroupIcon className={classes.radioIcon} />
              </div>
            }
          />
        </RadioGroup>
      </FormControl>

      <Button
        className={classes.button}
        size="large"
        variant="outlined"
        onClick={() => history.push("/graphs/questions")}
      >
        Create Graph
      </Button>
    </>
  );
};

export default AddGraph;
