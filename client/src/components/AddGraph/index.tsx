import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  FormControl,
  FormControlLabel,
  LinearProgress,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import GroupIcon from "@material-ui/icons/Group";
import { useDispatch } from "react-redux";
import { addNewGraph } from "../../slice/graphsSlice";
import { useSnackbar } from "notistack";

import styles from "./AddGraph.module.scss";
import { postGraph } from "../../api/graphApi";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: 30,
    marginBottom: 20,
  },
  textField: {},
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
  const defaultName = "";
  const defaultIsPrivate = true;

  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState(defaultName);
  const [isPrivate, setIsPrivate] = useState(defaultIsPrivate);
  const [isLoading, setIsLoading] = useState(false);

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
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <FormControl className={classes.radioGroup} component="fieldset">
        <RadioGroup
          value={isPrivate ? "private" : "public"}
          onChange={(event) =>
            setIsPrivate(event.target.value === "private" ? true : false)
          }
        >
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
        onClick={async () => {
          try {
            if (!name) {
              enqueueSnackbar(`Please provide name for graph`, {
                variant: "error",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
              });
              return;
            }

            setIsLoading(true);

            let graph = await postGraph(name, isPrivate);
            dispatch(addNewGraph(graph));

            setName(defaultName);
            setIsPrivate(defaultIsPrivate);
            setIsLoading(false);

            enqueueSnackbar(`Successfully added ${name} graph`, {
              variant: "success",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
            });
          } catch (err) {
            enqueueSnackbar(`Failed to add ${name} graph`, {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
            });
          }
        }}
      >
        Create Graph
      </Button>

      {isLoading && <LinearProgress />}
    </>
  );
};

export default AddGraph;
