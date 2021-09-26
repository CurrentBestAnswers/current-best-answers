import React from "react";
import Graph from "../components/Graph";

import styles from "./index.module.scss";

const Graphs = ({}) => {
  return (
    <div className={styles.viewport}>
      <Graph />
    </div>
  );
};

export default Graphs;
