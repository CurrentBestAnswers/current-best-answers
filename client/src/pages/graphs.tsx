import React from "react";
import styles from "./index.module.scss";
import Graph from "../components/Graph";

const Graphs = ({}) => {
  return (
    <div className={styles.viewport}>
      <Graph />
    </div>
  );
};

export default Graphs;
