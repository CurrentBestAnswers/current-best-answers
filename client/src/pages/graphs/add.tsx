import React from "react";
import Graph from "../../components/Graph";
import AddGraph from "../../components/AddGraph";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: "20px auto",
  },
}));

const Add = ({}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Graph />
      <AddGraph />
    </div>
  );
};

export default Add;
