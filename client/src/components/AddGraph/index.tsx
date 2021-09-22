import React from "react";
import styles from "./AddGraph.module.scss";
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

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px auto",
  },
  heading: {
    marginBottom: 20,
  },
  textField: {
    width: 250,
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
    width: 250,
    marginTop: 20,
  },
}));

interface Props {}

const AddGraph = ({}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Typography className={classes.heading} variant="h5">
        Create New Graph
      </Typography>

      <TextField
        className={classes.textField}
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
    </div>
  );
};

export default AddGraph;
