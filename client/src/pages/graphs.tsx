import React from "react";
import Graph from "../components/Graph";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: "20px auto",
  },
}));

const Graphs = ({}) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Graph />
    </div>
  );
};

export default Graphs;
